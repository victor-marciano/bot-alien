const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 24000,
	data: new SlashCommandBuilder()
		.setName('superlike')
		.setDescription('envia um superlike anônimo para alguém')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('pessoa que vai receber')
                .setRequired(true)
        ),
	async execute(interaction) {
        try {
            const query = interaction.options.getString('user', true);

            if (!`${query}`.match(/<@.?[0-9]*?>/g)) {
                await interaction.reply({ content: 'Erro, por favor insira um usuário válido (ex: @Victor) !!', ephemeral: true });      
                return;          
            }

            await interaction.reply({ content: 'Seu superlike foi enviado com sucesso!', ephemeral: true });
           
            if (`${query}` === `${interaction.user}`) {
                return interaction.channel.send(`${interaction.member} deu um superlike em si mesmo, coisa feia`);
            }

            return interaction.channel.send(`${query} recebeu um superlike anônimo`);
        } catch (err) {
            console.error(err);
        }
	},
};