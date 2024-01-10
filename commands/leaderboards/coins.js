const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");

const db = new QuickDB()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coins')
		.setDescription('mostra quantas moedas do galaxy o usuário possui'),
	async execute(interaction) {
        try {
            const coins = await db.get(`${interaction.user.id}.coins`)
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} possui ${coins || 0} moedas do servidor`);
        } catch (err) {
            console.error(err);
        }
	},
};