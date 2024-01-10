const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
moment.locale('pt');

module.exports = {
    cooldown: 60,
	data: new SlashCommandBuilder()
		.setName('sumido')
		.setDescription('exibe quanto tempo X pessoa está sem mandar mensagens no servidor')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('user da pessoa <com @ etc>')
                .setRequired(true)
        ),
	async execute(interaction) {
        try {
            const query = interaction.options.getString('user', true);

            if (!`${query}`.match(/<@.?[0-9]*?>/g)) {
                await interaction.reply({ content: 'Erro, por favor insira um usuário válido (ex: @Victor) !!', ephemeral: true });
                return;
            }

            let userId = query.replace(/\D/g, "");
            const lastMessage = await db.get(`${userId}.lastMessage`);

            await interaction.deferReply();

            const user = interaction.client.users.cache.get(userId);

            if (!lastMessage) {
                return interaction.followUp(`${user.username} ainda não enviou mensagens desde que o comando foi criado`, { ephemeral: true });
            }

            let lastMsgDateString = moment(lastMessage.date).fromNow(true);

            return interaction.followUp(`${query} está sumido(a) a ${lastMsgDateString}`);
        } catch (err) {
            console.error(err);
        }
	},
};