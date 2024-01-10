const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 30,
	data: new SlashCommandBuilder()
		.setName('clima')
		.setDescription('pergunta ao bot a temperatura de uma cidade/região')
        .addStringOption(option =>
            option.setName('cidade')
                .setDescription('cidade/região a ser analisada')
                .setRequired(true)
        ),
	async execute(interaction) {
        try {
            const query = interaction.options.getString('cidade', true);
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_API_KEY}&q=${query}&aqi=no&lang=pt`)
            const data = await response.json()

            if (!data.location) {
                return await interaction.reply({ content: 'Não foi possível encontrar uma localização pra esse nome.', ephemeral: true });
            }
            await interaction.deferReply();

            return interaction.followUp(`Clima em ${data.location.name}/${data.location.region} é: ${data.current.temp_c}°C - condição: ${data.current.condition.text}`);
        } catch (err) {
            console.error(err);
        }
	},
};