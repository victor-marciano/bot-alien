const { SlashCommandBuilder } = require('discord.js');
const { locais } = require('../../datasets/cidades')

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('localamor')
		.setDescription('pergunta ao bot onde está seu futuro amor'),
	async execute(interaction) {
        try {
            const local = locais[Math.floor(Math.random() * locais.length)];
            await interaction.deferReply();
            return interaction.followUp(`O amor de ${interaction.user} está em ${local}`);
        } catch (err) {
            console.error(err);
        }
	},
};