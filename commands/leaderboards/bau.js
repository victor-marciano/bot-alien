const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");

const db = new QuickDB()

module.exports = {
    cooldown: 86400,
	data: new SlashCommandBuilder()
		.setName('bau')
		.setDescription('abre o baú diário, boa sorte nas recompensas'),
	async execute(interaction) {
        try {
            let qtdCoins = Math.floor(Math.random() * 10)
            let extra = interaction.member.roles.cache.some(r => r.name === "♗ LivePix") ? (Math.floor(Math.random() * 10)) : false
            let html = ''
            
            if(extra) {
                await db.add(`${interaction.user.id}.coins`, extra)
                html = `e ${extra} moedas extra por ser assinante Livepix`
            }

            await db.add(`${interaction.user.id}.coins`, qtdCoins)
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} abriu o baú diário e ganhou ${qtdCoins} moedas ${html}`);
        } catch (err) {
            console.error(err);
        }
	},
};