const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wrongsong')
		.setDescription('Remove a última música da fila!'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            queue.removeTrack(tracks[tracks.length - 1]);
            return interaction.followUp(`Música removida com sucesso`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e.message}`);
        }
	},
};