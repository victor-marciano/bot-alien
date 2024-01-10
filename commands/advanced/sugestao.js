const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 600,
	data: new SlashCommandBuilder()
		.setName('sugestao')
		.setDescription('sugere alguma ideia/ação para o canal anonimamente, a mensagem é enviada para a moderação')
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('sugestão anonima')
                .setRequired(true)
        ),
	async execute(interaction) {
        try {
            const query = interaction.options.getString('mensagem', true);
            const channelMod = interaction.guild.channels.cache.find(channel => channel.name === "🔧╺╸moderação")
            channelMod.send(`${query}`)
            console.log(interaction.user)
            return await interaction.reply({ content: 'Sua sugestão foi enviada com sucesso!', ephemeral: true });;
        } catch (err) {
            console.error(err);
        }
	},
};