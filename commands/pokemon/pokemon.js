const { SlashCommandBuilder } = require('discord.js');
const { pokemons } = require('../../datasets/pokemon')
const { QuickDB } = require("quick.db");

const db = new QuickDB()

module.exports = {
    cooldown: 86400,
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('captura um pokemon'),
	async execute(interaction) {
        try {
            const pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
            await db.push(`${interaction.user.id}.pokemons`, pokemon);
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} capturou um **${pokemon}**`);
        } catch (err) {
            console.error(err);
        }
	},
};