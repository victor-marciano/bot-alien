const { useQueue } = require('discord-player');
const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Aplica filtro de som no player de música'),
	async execute(interaction) {
        const select = new StringSelectMenuBuilder()
			.setCustomId('starter')
			.setPlaceholder('Make a selection!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Bulbasaur')
					.setDescription('The dual-type Grass/Poison Seed Pokémon.')
					.setValue('bulbasaur'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Charmander')
					.setDescription('The Fire-type Lizard Pokémon.')
					.setValue('charmander'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Squirtle')
					.setDescription('The Water-type Tiny Turtle Pokémon.')
					.setValue('squirtle'),
		    );

            
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