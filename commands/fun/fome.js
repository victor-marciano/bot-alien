const { SlashCommandBuilder } = require('discord.js');
const { foods } = require('../../datasets/food')

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('food')
		.setDescription('pergunta ao bot o que você vai comer'),
	async execute(interaction) {
        try {
            const food = foods[Math.floor(Math.random() * foods.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} ${food}`);
        } catch (err) {
            console.error(err);
        }
	},
};