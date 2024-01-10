const { SlashCommandBuilder } = require('discord.js');
const { cheiros } = require('../../datasets/cheiro')

module.exports = {
    cooldown: 600,
	data: new SlashCommandBuilder()
		.setName('cheiro')
		.setDescription('pergunta ao bot qual o seu cheiro'),
	async execute(interaction) {
        try {
            const cheiro = cheiros[Math.floor(Math.random() * cheiros.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} está com cheiro de ${cheiro}`);
        } catch (err) {
            console.error(err);
        }
	},
};