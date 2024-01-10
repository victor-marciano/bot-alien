const { SlashCommandBuilder } = require('discord.js');
const { streamers } = require('../../datasets/streamer')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamer')
		.setDescription('o bot diz como o streamer está agora'),
	async execute(interaction) {
        try {
            const streamer = streamers[Math.floor(Math.random() * streamers.length)];
            await interaction.deferReply();
            return interaction.followUp(`Hoje o streamer está ${streamer}`);
        } catch (err) {
            console.error(err);
        }
	},
};