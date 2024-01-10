const { SlashCommandBuilder } = require('discord.js');
const { jobs } = require('../../datasets/job')

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('job')
		.setDescription('pergunta ao bot qual o seu emprego'),
	async execute(interaction) {
        try {
            const job = jobs[Math.floor(Math.random() * jobs.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} vai trabalhar de ${job}`);
        } catch (err) {
            console.error(err);
        }
	},
};