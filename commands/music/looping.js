const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('looping')
		.setDescription('Aciona um modo de looping da fila de músicas!')
        .addStringOption(option =>
            option.setName('modo')
                .setDescription('0 = sem loop, 1 = só a faixa atual, 2 = lista inteira, 3 = toca sons automaticos baseado na playlist')),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const mode = interaction.options.getString('modo', true);

        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            queue.setRepeatMode(mode);
            return interaction.followUp(`Playlist embaralhada`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Algo deu errado: ${e.message}`);
        }
	},
};