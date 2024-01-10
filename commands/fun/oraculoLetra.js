const { SlashCommandBuilder } = require('discord.js');

const letras = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Nenhuma"
]

module.exports = {
    cooldown: 48600,
	data: new SlashCommandBuilder()
		.setName('oraculo_letra')
		.setDescription('pergunta ao bot qual a letra de hoje pra você'),
	async execute(interaction) {
        try {
            const letra = letras[Math.floor(Math.random() * letras.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user}, sua letra de hoje é: **${letra}**`);
        } catch (err) {
            console.error(err);
        }
	},
};