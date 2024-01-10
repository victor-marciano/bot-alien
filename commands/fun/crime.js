const { SlashCommandBuilder } = require('discord.js');
const { crimes } = require('../../datasets/crime')

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('crime')
		.setDescription('pergunta ao bot qual crime você cometeu'),
	async execute(interaction) {
        try {
            const crime = crimes[Math.floor(Math.random() * crimes.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} foi preso ${crime}`);
        } catch (err) {
            console.error(err);
        }
	},
};