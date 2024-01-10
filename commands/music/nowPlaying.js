const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('now-playing')
		.setDescription('Mostra a música que está tocando agora!'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
        const currentTrack = queue.currentTrack; //Gets the current track being played

        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            return interaction.followUp(`Música atual: ${currentTrack}`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e.message}`);
        }
	},
};