const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const { pagination, ButtonTypes, ButtonStyles} = require('@devraelfreeze/discordjs-pagination');

const db = new QuickDB()

module.exports = {
    cooldown: 60,
	data: new SlashCommandBuilder()
		.setName('pokedex')
		.setDescription('mostra quais pokemons voce tem'),
	async execute(interaction) {
        try {
            const pokemons = await db.get(`${interaction.user.id}.pokemons`);
            const pokedex = [];
            let acumulator = 0;

            while (pokemons.length > 0) {
                const firstPokemons = pokemons.splice(0, 24);
                const arrFields = [];

                for (let i = 0; i < firstPokemons.length; i++) {
                    const pokemon = firstPokemons[i];
                    arrFields.push({ name: `#${i+acumulator}`, value: pokemon, inline: true});
                }

                pokemonEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Pokedéx Galaxy')
                .setDescription('Pokemóns que você possui')
                .addFields(arrFields)

                pokedex.push(pokemonEmbed);
                acumulator += 24;
            }

            await interaction.deferReply();

            await pagination({
                embeds: pokedex, /** Array of embeds objects */
                interaction: interaction,
                ephemeral: true,
                time: 300000, /** 300 seconds */
                disableButtons: false, /** Remove buttons after timeout */
                fastSkip: true,
                deleteAtEnd: true,
                author: interaction.member.user,
                customFilter: (interaction) => {
                  return interaction.member.user.id === interaction.member.user.id;
                },
                buttons: [
                  {
                    type: ButtonTypes.previous,
                    label: 'Anterior',
                    style: ButtonStyles.Primary
                  },
                  {
                    type: ButtonTypes.next,
                    label: 'Próxima',
                    style: ButtonStyles.Success
                  }
                ]
              });
        } catch (err) {
            console.error(err);
        }
	},
};