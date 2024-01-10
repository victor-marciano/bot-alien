const { useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sr')
		.setDescription('Envia uma musica para a fila de músicas!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Nome da música para inserir')
                .setAutocomplete(true)),
    async autocomplete(interaction) {
        const player = useMainPlayer();
        if (!interaction.options.getString('query', true)) {
            return;
        }
        const query = interaction.options.getString('query', true);
        const results = await player.search(query);

        return interaction.respond(
            results.tracks.slice(0, 10).map((t) => ({
                name: t.title,
                value: t.url
            }))
        );
    },
	async execute(interaction) {
        const player = useMainPlayer();
		const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('Você não está conectado em um canal de voz!'); // make sure we have a voice channel
        const query = interaction.options.getString('query'); // we need input/query to play
        const searchResult = await player.search(query, { requestedBy: interaction.user });
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            if (!searchResult.hasTracks()) {
                await interaction.reply(`Nenhuma música encontrada para a busca: ${query}!`);
                return;
            }
            else {
                await player.play(channel, query, {
                    nodeOptions: {
                        metadata: interaction,
                        leaveOnEmpty: true,
                        leaveOnEmptyCooldown: 4000,
                        volume: 40,
                        leaveOnEnd: true,
                        leaveOnEndCooldown: 500,
                        maxSize: 50,
                        skipOnNoStream: true
                    }
                });
                
                return ;
            }
        } catch (e) {
            // let's return error if something failed
            console.log(e)
            return interaction.followUp(`Algo deu errado: ${e.message}`, { ephemeral: true });
        }
	},
};

