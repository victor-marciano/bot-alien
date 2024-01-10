const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 1800,
	data: new SlashCommandBuilder()
		.setName('ajuda')
		.setDescription('faz um desabafo, pergunta, pede ajuda.. anonimamente (ninguém saberá que foi você)')
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('mensagem anonima')
                .setRequired(true)
        ),
	async execute(interaction) {
        try {
            if (interaction.channel.id !== "1179541734519226389") {
                return await interaction.reply({ content: 'Este comando só pode ser utilizado no canal ombro-amigo!', ephemeral: true });
            }
            const query = interaction.options.getString('mensagem', true);

            await interaction.reply({ content: 'Sua mensagem foi enviada com sucesso, ninguém saberá que foi você!', ephemeral: true });
            console.log(interaction.user)
            return interaction.channel.send(`${query}`);
        } catch (err) {
            console.error(err);
        }
	},
};