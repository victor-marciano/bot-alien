const express = require('express')
const app = express()
require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { SpotifyExtractor, SoundCloudExtractor, YouTubeExtractor, YoutubeExtractor } = require('@discord-player/extractor');
const { BridgeProvider, BridgeSource } = require('@discord-player/extractor')
const { QuickDB } = require("quick.db");
const { Utils } = require('./utils/utils')
const { filterArray, Filter } = require('./utils/filters')
const moment = require('moment')

const db = new QuickDB();

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration
	]	 
});

client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
	const authorId = message.author.id;
	
	if (Utils.isBot(authorId)) return;
	
	const channelId = message.channelId
	const channelFilter = filterArray.find(data => data.channel === channelId)

	if (channelFilter) {
		Filter[channelFilter.filter](message)
	}
	// Increment user's messageCount by 1
	await db.add(`${authorId}.messages`, 1);
	await db.add(`${authorId}.xp`, 2);
	await db.set(`${authorId}.lastMessage`, { content: message.content, date: moment() })
})

client.on(Events.GuildMemberRemove, async interaction => {
	const channelSaida = interaction.guild.channels.cache.find(channel => channel.id === "834488201167110205o")
    channelSaida.send(`<@${interaction.user.id}> saiu do servidor. <@&862975186189680660>`)
	Utils.resetPoints(interaction.user.id)
})

client.on(Events.GuildMemberAdd, async interaction => {
	const channelEntrada = interaction.guild.channels.cache.find(channel => channel.id === "834488201167110208")
    channelEntrada.send(`<@${interaction.user.id}> entrou no servidor, bem vindo(a)! Fique a vontade para interagir e se divertir em nosso ambiente.`)
})

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);
		
		if (!command) {
			console.error(`Nenhum comando com o nome ${interaction.commandName} foi encontrado.`);
			return;
		}
		
		const { cooldowns } = client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 60;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
	
			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({ content: `Espere o cooldown pro comando \`${command.data.name}\`. Você pode usar novamente <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}
	
		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
			await db.add(`${interaction.user.id}.xp`, 1);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Erro ao executar comando!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Erro ao executar comando!', ephemeral: true });
			}
		}
	}
	else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);
		
		if (!command) {
			console.error(`Nenhum comando com o nome ${interaction.commandName} foi encontrado.`);
			return;
		}
		
        await command.autocomplete(interaction);
	}
});

(async () => {
	const bridgeProviderSoundcloud = new BridgeProvider(BridgeSource.SoundCloud);
	const bridgeProviderYoutube = new BridgeProvider(BridgeSource.YouTube);

    const player = new Player(client, {
		connectionTimeout: 300,
	});
	
    await player.extractors.register(SpotifyExtractor, {
		bridgeProvider: bridgeProviderYoutube
	});

    await player.extractors.register(SoundCloudExtractor, {
		bridgeProvider: bridgeProviderYoutube
	});

    await player.extractors.register(YouTubeExtractor, {
		bridgeProvider: bridgeProviderSoundcloud
	});

    player.events.on('playerStart', (queue, track) => {
        queue.metadata.channel.send(`Começou a tocar: **${track.title}**! Enviada por: ${queue.metadata.user}`);
    });

    player.events.on('audioTrackAdd', (queue, track) => {
        queue.metadata.channel.send(`Música: **${track.title}** adicionada na fila por ${queue.metadata.user}`);
    });

    player.events.on('emptyChannel', (queue) => {
        queue.metadata.channel.send(`Ninguém na call, vou embora, adeus`);
    });
    
	player.events.on('emptyQueue', (queue) => {
        queue.metadata.channel.send('Fila de músicas finalizada, adicione mais músicas!');
    });

    player.events.on('error', (queue, error) => {
		console.log(`General player error event: ${error.message}`);
        console.log(error);
    });
    
    player.events.on('playerError', (queue, error) => {
		console.log(`Player error event: ${error.message}`);
        console.log(error);
    });
})()

client.login(process.env.DISCORD_TOKEN);