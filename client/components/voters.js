import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const initialState = {
  yes: [],
  no: [],
  abstation: [],
  absent: [],
};

class Voters extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  async componentDidMount() {

    let page1P = axios.get('https://dadosabertos.camara.leg.br/api/v2/votacoes/8538/votos?&pagina=1&itens=100')
    let page2P = axios.get('https://dadosabertos.camara.leg.br/api/v2/votacoes/8538/votos?&pagina=2&itens=100')
    let page3P = axios.get('https://dadosabertos.camara.leg.br/api/v2/votacoes/8538/votos?&pagina=3&itens=100')
    let page4P = axios.get('https://dadosabertos.camara.leg.br/api/v2/votacoes/8538/votos?&pagina=4&itens=100')
    let page5P = axios.get('https://dadosabertos.camara.leg.br/api/v2/votacoes/8538/votos?&pagina=5&itens=100')
    let page6P = axios.get('https://dadosabertos.camara.leg.br/api/v2/votacoes/8538/votos?&pagina=6&itens=100')

    const values = await Promise.all([page1P, page2P,page3P, page4P, page5P, page6P])

    const data = values.reduce((finalArr, arr) => {
      return [...finalArr, ...arr.data.dados]
    },[])
    console.log(data)
    let votesArray = data.reduce((obj, el) => {
      obj[el.parlamentar.id] = el.voto;
      return obj;
    }, {});
    const state = {
      yes: [],
      no: [],
      abstation: [],
      absent: [],
    };
    this.props.deputies.forEach(deputy => {
      if (votesArray[deputy.id] === 'Sim') {
        state.yes.push(deputy.id);
      } else if (votesArray[deputy.id] === 'Não') {
        state.no.push(deputy.id);
      } else if (votesArray[deputy.id] === 'Abstenção') {
        state.abstation.push(deputy.id);
      } else if (votesArray[deputy.id] === 'null') {
        state.absent.push(deputy.id);
      }
    });
    this.setState(state)
  }
  render() {
    console.log(this.state)
    return <h1>hi</h1>;
  }
}

const mapStateToProps = state => {
  return {
    deputies: state.deputies.list,
  };
};

export default connect(mapStateToProps)(Voters);
