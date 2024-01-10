const { useHistory } = require("discord-player");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('previous')
        .setDescription('Volta para a música anterior'),
    async execute(interaction) {
        const history = useHistory(interaction.guild.id);
        
        try {
            await history.previous();
            return ;
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e.message}`, { ephemeral: true });
        }
    },
};