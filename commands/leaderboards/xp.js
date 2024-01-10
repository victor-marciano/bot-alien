const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");

const db = new QuickDB()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('xp')
		.setDescription('mostra quantos pontos de experiência você tem'),
	async execute(interaction) {
        try {
            const xp = await db.get(`${interaction.user.id}.xp`)
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} possui ${xp}xp`);
        } catch (err) {
            console.error(err);
        }
	},
};