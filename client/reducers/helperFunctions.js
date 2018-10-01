
const basicApi = `https://dadosabertos.camara.leg.br/api/v2/`
const deputados = `deputados?`
const idLegislatura = `idLegislatura=55`
const siglaUf = `siglaUf=SP`
const siglaPartido = 'siglaPartido='
const itens = 'itens=100'

export const fetchDeputies = (parties) => {
  let api = `${basicApi}${deputados}${idLegislatura}&${siglaUf}&`
  parties.forEach(party => {
    api += `${siglaPartido}${party}&`
  });
  return api + itens
}




export const getCandidates = state => {
  return `http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/${state}/2022802018/6/candidatos`
}

export const getPartiesAndAlliances = listOfCandidates => {
  let seen = {}
  const parties = listOfCandidates.reduce((final, cand) => {
    let partyNumber = Math.floor(cand.numero/100)
    if(!seen[partyNumber]){
      seen[partyNumber] = true
      let partyName = cand.partido.sigla
      let alliance = cand.nomeColigacao
      return [...final, {partyNumber, partyName, alliance}]
    } else{
      return final
    }

  }, [])

  return parties
}

export const filterMyCandidates = (list, state) => {
  let links = []
  list.forEach(cand => {
    let link = `http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/${state}/2022802018/candidato/${cand.id}`
    links.push(link)
  })
  return links
}

