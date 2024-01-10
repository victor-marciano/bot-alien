const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ComponentType } = require('discord.js');
const { QuickDB } = require("quick.db");

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('emblema')
		.setDescription('Obtém um emblema exibido ao lado do nome'),
	async execute(interaction) {
        if (!interaction.member.roles.cache.some(r => ["♕ Patrocinador", "♗ LivePix", "♙ SUB"].includes(r.name)) ) {
            await interaction.reply({ content: 'Função disponíveis apenas para assinantes, aguarde a liberação!', ephemeral: true });
            return true;
        }
        const db = new QuickDB();

		const select = new StringSelectMenuBuilder()
			.setCustomId('emblema')
			.setPlaceholder('Escolha seu emblema!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Corinthians')
					.setValue('1157886904507826186'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Palmeiras')
					.setValue('1157886994391781436'),
				new StringSelectMenuOptionBuilder()
					.setLabel('São Paulo')
					.setValue('1157887044886986793'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Santos')
					.setValue('1157887086788096020'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Flamengo')
					.setValue('1176639021582143488'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Vasco')
					.setValue('1176639248015827006'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Botafogo')
					.setValue('1176638960139780198'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Fluminense')
					.setValue('1176639217619709963'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Cruzeiro')
					.setValue('1176639188037283892'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Atlético-MG')
					.setValue('1176639114347548672'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Grêmio')
					.setValue('1176923531888570368'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Internacional')
					.setValue('1176639055711174656'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Assassino')
					.setValue('1176646979158298754'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Profissional')
					.setValue('1176647219605164122'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Pássaro Dodo')
					.setValue('1176647016756039712'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Pombo')
					.setValue('1176647144137035796'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Falcão')
					.setValue('1176647113837383682'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Espião')
					.setValue('1176647269198594249'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Pelicano')
					.setValue('1176647076420001823'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Abutre')
					.setValue('1176647299728937073'),
                new StringSelectMenuOptionBuilder()
					.setLabel('Corvo')
					.setValue('1176647172779945984'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

        const response = await interaction.reply({
			content: 'Selecione o emblema desejado!',
            ephemeral: true,
			components: [row],
		});

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

        collector.on('collect', async i => {
            const selection = i.values[0];
            const role = i.member.guild.roles.cache.get(selection);
            const member = i.member;
            
            const oldRole = await db.get(`${interaction.user.id}.emblema`)
            if (oldRole) {    
                member.roles.remove(oldRole.id);                
            }
            
            member.roles.add(role);
            await db.set(`${interaction.user.id}.emblema`, role);
            await i.reply({ content: `${i.user} seu emblema foi atualizado!`, ephemeral: true });
        });
	},
};