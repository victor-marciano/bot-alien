const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pausa a musica atual!'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            queue.node.setPaused(!queue.node.isPaused());//isPaused() returns true if that player is already paused
            return interaction.followUp(`Música pausada por ${interaction.member.name}`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e. message}`);
        }
	},
};