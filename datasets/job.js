const jobs = [
    "Padeiro",
"Porteiro",
"Engenheiro",
"Professor de História",
"Dentista",
"Veterinário",
"Médico",
"Urologista",
"Empacotador",
"Caixa do MC Donalds",
"Prostituta",
"Blogueirinha",
"Streamer",
"Pedreiro",
"Arquiteto",
"Cozinheiro",
"Lixeiro",
"Jogador profissional de League of Legends",
"Programador",
"Vagabundo",
"Político",
"Ditador",
"Ator/Atriz pornô",
"Youtuber de Minecraft",
"Jogador de time de série B",
"Modelo de roupa usada",
"Modelo fitness",
"Personal Trainer",
"Corretor de Imóveis",
"Nutricionista",
"Pedagogo",
"Psicólogo",
"Jogador de golf",
"Tio(a) da cantina",
"Babá",
"Forex Trader",
"Ladrão",
"Traficante",
"Agiota",
"Bicheiro",
"Dar golpe em idosos",
"Cientista",
"Cirurgião plástico",
"Pedinte de PIX",
"Webputa",
"Vendedor de sapato",
"Faz tudo para os pais",
"Carnavalesco",
"Artista",
"Funkeiro",
"Ciclista",
"Diplomata",
"Sargento do exército",
"Eletricista",
"Apresentador de programa na TV aberta",
"Comerciante do Metrô de São Paulo",
"Cigano",
"Lutador do UFC",
"Testador de colchão",
"Bailarina",
"Cantor sertanejo",
"Dono de página de memes",
"Astronauta",
"Ginecologista",
"Palhaço",
"Cabeleireiro",
"Piloto de avião",
"Aeromoça",
"Tia da limpeza",
"Aviãozinho da quebrada",
"Contador",
"Autor famoso de livro",
"Ator de filme de herói",
"Mecânico",
"Engraxate",
"Pintor",
"Maquiadora",
"Coach de desenvolvimento pessoal",
"Churrasqueiro",
"Relojoeiro",
"Dançarina do Faustão",
"Paquita da Xuxa",
"Espremedor de limão profissional",
"DJ",
"Monge",
"Pastor de Igreja Evangélica",
"Bodybuilder",
"Enfermeiro",
"Adestrador de cães",
"Mesário voluntário",
"Designer",
"Hacker do Anonymous",
"Modelo de calcinha",
"Bodypiercer",
"Tatuador",
"Metalúrgico",
"Centroavante do Vasco",
"Técnico de futebol",
"Juíz",
"Advogado",
"Crackudo",
"Mãe solteira que ganha pensão do marido rico",
"Herdeiro de Dom Pedro Segundo",
"Confeiteira",
"Humorista de stand-up",
"Vidraceiro",
"Gogoboy",
"Eterno estudante universitário",
"Taxista",
"Uber",
"Motoboy do iFood",
"Aposentado por perder o dedo mindinho",
"Frentista do posto Ipiranga",
"Sex Symbol da Bolívia",
"Segurança de balada adolescente",
"Atendente de telemarketing",
"Sexólogo",
"Tradutor de libras",
"Funcionário público",
"Instrutor de auto-escola",
"Animador de festa",
"Tiktoker",
"Mendigo",
"Vendedora de pack",
"Barman",
"Designer de fantasia",
"Flanelinha",
"Maquinista de trem",
"Encontrando a cura do cancer",
"Tarólogo",
"Dono de um casino em Santa Catarina",
"Cangaçeiro",
"Traficante de mulheres na Colômbia",
"Piloto de Fórmula 1",
"Boxeador",
"Prestar serviço comunitário após ser preso",
"Tenista",
"Bitconheiro de internet",
"Sustentado pelo bolsa família",
"Camelô",
"Fazendo arrastões no RJ",
"Mágico em festinha de criança",
"Vendedor de crianças em Taiwan",
"Agricultor",
"Olheiro do Barcelona",
"Bóia fria",
"Streamer no Chaturbate",
"Jogador de loteria",
"Açougueiro",
"Fiscal da vigilância sanitária",
"Farmacêutico de mercado negro",
"Coveiro",
"Caçando véia rica",
"Professora de Yoga",
"Especialista de Anime",
"Kpoper famoso(a)",
"Jogador de baseball",
"Guitarrista",
"Vocalista de banda Tecnobrega",
"Mímico",
"Ajudando o Boulos no MST",
"Dublê do Chuck Norris",
"Comentarista de BBB",
"Comentarista de futebol",
"Líder de movimento estudantil em faculdade pública",
"Dublador de série da Record",
"Astrólogo",
"Membro do MBL",
"Cozinheiro do Bom Prato",
"Podólogo",
"Vendedor de água no deserto",
"Garçonete",
"Marceneiro",
"Engraxate",
"Vendedor de curso na Udemy",
"Salva-vidas",
"Acompanhante de luxo nos Jardins",
"Dono de parque de diversões",
"Moderador de fórum na deep web",
"Mamando o Victor",
"Cuidador de idosos",
"Masturbador profissional no Japão",
"Sugar baby",
"Holder de Dogecoin",
"Pianista",
"Oftalmologista",
"Inútil que mora com a vó",
"Contador de histórias",
"Cobaia para mosquito",
"Coletor de esperma",
"Contador de peixes",
"Desentupidor de esgoto",
"Guarda do palácio de Buckingham",
"Limpando a muralha da China",
"Analista de fezes",
"Provador de caixões",
"Limpador íntimo de atletas de sumô",
"Mineiro",
"Mineirador de bitcoin",
"Provador de ração animal",
"Masturbador de animais",
"Otorrinolaringologista",
"Meteorologista",
"Astrônomo",
"Logístico",
"Assistente social",
"Marinheiro",
"Pirata",
"Caixa de banco",
"Balconista de boteco",
"Alfaiate",
"Designer de moda",
"Agente penitenciário",
"Repórter",
"Sommelier de vinhos",
"Sommelier de idosas",
"Fazendo tudo que %randomUser0% mandar",
"Patinador",
"Jogador de hóquei",
"Boxeador",
"Lambedor de poste",
"Enxugador de Gelo",
"Judoca",
"Apresentador de Podcast",
"Cobaia humana para sobreviver em Marte",
"Leiteiro",
"Bússola humana",
"Editor de fotos",
"Executivo em multinacional",
"Professora de Yoga",
"Pregador",
"Queimador de rosca",
"Massagista da seleção feminina de vôlei",
"Testando novas posições pro kama-sutra",
"Putinha do streamer",
"Medidor profissional de falo",
"Faraó",
"Barriga de aluguel",
"Organizador de orgias",
"Jogador de sinuca",
"Benzedeira",
"Muambeiro",
"Membro do cicada3301",
"Desmatador da amazônia",
"Fingidor de possessões demoníacas em igrejas de bairro pobre",
]

module.exports = { jobs }