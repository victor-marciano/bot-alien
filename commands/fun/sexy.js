const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('sexy')
		.setDescription('pergunta ao bot o quão sexy você é'),
	async execute(interaction) {
        try {
            const percent = Math.floor(Math.random() * 100);
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} é ${percent}% sexy!`);
        } catch (err) {
            console.error(err);
        }
	},
};