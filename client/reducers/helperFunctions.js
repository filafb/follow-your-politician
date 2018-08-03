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


