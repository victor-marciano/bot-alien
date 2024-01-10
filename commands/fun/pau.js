const { SlashCommandBuilder } = require('discord.js');

const pau = [
    5,
    6,
    7,
    8, 8,
    9, 9,
    10, 10, 10,
    11, 11, 11,
    12, 12, 12, 12,
    13, 13, 13, 13, 13,
    14, 14, 14, 14,
    15, 15, 15, 15,
    16, 16, 16, 16,
    17, 17, 17,
    18, 18, 18,
    19, 19,
    20, 20,
    21, 21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30
]

module.exports = {
    cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('pau')
		.setDescription('pergunta ao bot o tamanho do seu pau'),
	async execute(interaction) {
        try {
            const percent = pau[Math.floor(Math.random() * pau.length)];
            await interaction.deferReply();
            return interaction.followUp(`${interaction.user} tem ${percent}cm de pau!`);
        } catch (err) {
            console.error(err);
        }
	},
};