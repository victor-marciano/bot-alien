const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Embaralha a fila de músicas!'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
    
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            queue.tracks.shuffle();
            return interaction.followUp(`Fila de música embaralhada`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e}`, { ephemeral: true });
        }
	},
};