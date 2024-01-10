const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Pula a música atual!'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            queue.node.skip()//isPaused() returns true if that player is already paused
            return interaction.followUp(`Música pulada por ${interaction.user}`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e.message}`, { ephemeral: true });
        }
	},
};