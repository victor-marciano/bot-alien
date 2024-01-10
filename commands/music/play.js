const { useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Toca ou despausa a música atual!'),
	async execute(interaction) {
        const player = useMainPlayer();
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            });
            return interaction.followUp(`Música voltou a tocar`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e}`, { ephemeral: true });
        }
	},
};