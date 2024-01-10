const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_niver')
		.setDescription('registra a data de seu aniversário'),
	async execute(interaction) {
        try {
            // await db.set(interaction.user.id, {niver: })
            const cheiro = cheiros[Math.floor(Math.random() * cheiros.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} está com cheiro de ${cheiro}`);
        } catch (err) {
            console.error(err);
        }
	},
};