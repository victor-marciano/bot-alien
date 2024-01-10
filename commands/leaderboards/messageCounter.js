const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");

const db = new QuickDB()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mensagens')
		.setDescription('mostra quantas mensagens válidas você já enviou no servidor'),
	async execute(interaction) {
        try {
            const msgs = await db.get(`${interaction.user.id}.messages`)
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} já enviou ${msgs} mensagens no servidor`);
        } catch (err) {
            console.error(err);
        }
	},
};