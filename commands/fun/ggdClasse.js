const { SlashCommandBuilder } = require('discord.js');
const { ggdClasses } = require('../../datasets/ggdClasses')

module.exports = {
    cooldown: 48000,
	data: new SlashCommandBuilder()
		.setName('ggdclasse')
		.setDescription('pergunta ao bot qual sua classe do GGD hoje'),
	async execute(interaction) {
        try {
            const classe = ggdClasses[Math.floor(Math.random() * ggdClasses.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user}, sua classe de hoje é: **${classe}**`);
        } catch (err) {
            console.error(err);
        }
	},
};