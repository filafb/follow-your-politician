const { db, Party, Alliance } = require('./server/db')

const parties = [
  {
    generalId: 36844,
    shortName: "PT",
    name: "Partido dos Trabalhadores",
    electoralNumber: 13,
    allianceId: 1,

  },
  {
    generalId: 36779,
    shortName: "PCdoB",
    name: "Partido Comunista do Brasil",
    electoralNumber: 65,
    allianceId: 1,


  },
  {
    generalId: 36814,
    shortName: "PR",
    name: "Partido da República",
    electoralNumber: 22,
    allianceId: 1,

  },
  {
    generalId: 36851,
    shortName: "PV",
    name: "Partido Verde",
    electoralNumber: 43,

  },
  {
    generalId: 36843,
    shortName: "PSTU",
    name: "Partido Socialista dos Trabalhadores Unificado",
    electoralNumber: 16,
    allianceId: 2,

  },
  {
    generalId: 36839,
    shortName: "PSOL",
    name: "Partido Socialismo e Liberdade",
    electoralNumber: 50,
    allianceId: 2,

  },
  {
    generalId: 36824,
    shortName: "PRP",
    name: "Partido Republicano Progressista",
    electoralNumber: 44,
    allianceId: 3,

  },
  {
    generalId: 36793,
    shortName: "PHS",
    name: "Partido Humanista da Solidariedade",
    electoralNumber: 31,
    allianceId: 3,

  },
  {
    generalId: 36829,
    shortName: "PRTB",
    name: "Partido Renovador Trabalhista Brasileiro",
    electoralNumber: 28,

  },
  {
    generalId: 36898,
    shortName: "AVANTE",
    name: "Avante",
    electoralNumber: 70,
    allianceId: 4,

  },
  {
    generalId: 36846,
    shortName: "PTC",
    name: "Partido Trabalhista Cristão",
    electoralNumber: 36,
    allianceId: 4,

  },
  {
    generalId: 36801,
    shortName: "PMN",
    name: "Partido da Mobilização Nacional",
    electoralNumber: 33,
    allianceId: 4,

  },
  {
    generalId: 36896,
    shortName: "PODE",
    name: "Podemos",
    electoralNumber: 19,
    allianceId: 4,

  },
  {
    generalId: 36837,
    shortName: "PSL",
    name: "Partido Social Liberal",
    electoralNumber: 17,
    allianceId: 4,

  },
  {
    generalId: 36769,
    shortName: "DEM",
    name: "Democratas",
    electoralNumber: 25,
    allianceId: 5,

  },
  {
    generalId: 36835,
    shortName: "PSDB",
    name: "Partido da Social Democracia Brasileira",
    electoralNumber: 45,
    allianceId: 5,

  },
  {
    generalId: 36813,
    shortName: "PPS",
    name: "Partido Popular Socialista",
    electoralNumber: 23,
    allianceId: 5,

  },
  {
    generalId: 36815,
    shortName: "PRB",
    name: "Partido Republicano Brasileiro",
    electoralNumber: 10,
    allianceId: 5,

  },
  {
    generalId: 36899,
    shortName: "MDB",
    name: "Movimento Democrático Brasileiro",
    electoralNumber: 15,
    allianceId: 6,

  },
  {
    generalId: 36834,
    shortName: "PSD",
    name: "Partido Social Democrático",
    electoralNumber: 55,
    allianceId: 6,

  },
  {
    generalId: 36809,
    shortName: "PP",
    name: "Partido Progressista",
    electoralNumber: 11,
    allianceId: 6,

  },
  {
    generalId: 36786,
    shortName: "PDT",
    name: "Partido Democrático Trabalhista",
    electoralNumber: 12,

  },
  {
    generalId: 36763,
    shortName: "PROS",
    name: "Partido Republicano da Ordem Social",
    electoralNumber: 90,

  },
  {
    generalId: 37900,
    shortName: "PATRI",
    name: "Patriota",
    electoralNumber: 51,

  },
  {
    generalId: 36887,
    shortName: "PMB",
    name: "Partido da Mulher Brasileira",
    electoralNumber: 35,

  },
  {
    generalId: 36762,
    shortName: "PPL",
    name: "Partido Pátria Livre",
    electoralNumber: 54,

  },
  {
    generalId: 36832,
    shortName: "PSB",
    name: "Partido Socialista Brasileiro",
    electoralNumber: 40,

  },
  {
    generalId: 36833,
    shortName: "PSC",
    name: "Partido Social Cristão",
    electoralNumber: 20,

  },
  {
    generalId: 36836,
    shortName: "PSDC",
    name: "Partido Social Democrata Cristão",
    electoralNumber: 27,

  },
  {
    generalId: 36845,
    shortName: "PTB",
    name: "Partido Trabalhista Brasileiro",
    electoralNumber: 14,

  },
  {
    generalId: 36765,
    shortName: "SD",
    name: "Solidariedade",
    electoralNumber: 77,

  },
  {
    generalId: 36886,
    shortName: "REDE",
    name: "Rede Sustentabilidade",
    electoralNumber: 18,

  }
]

const alliances =[
  {
    id: 1,
    name: 'Pra Mudar de Verdade'
  },
  {
    id: 2,
    name: 'Frente de Esquerda'
    },
    {
    id: 3,
    name: 'Unidos por São Paulo'
    },
    {
      id: 4,
      name: 'Projeto Vitória'
    },
    {
      id: 5,
      name: 'Aqui é São Paulo'
    },
    {
      id: 6,
      name: 'São Paulo quer o melhor'
    }
]


const seed = () => Promise.all(alliances.map(alliance => Alliance.create(alliance))
)
.then( () => Promise.all(parties.map(party => Party.create(party)))
)

const seedIt = () => {
  db.sync({force:true})
  .then( () => {
    return seed()
  })
  .catch(err => {
    console.log('error seeding')
    console.log(err.stack)
  })
  .then(() => {
    db.close()
    return null
  })
}

seedIt()
