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
    this.handleClick = this.handleClick.bind(this)
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
        state.yes.push(deputy);
      } else if (votesArray[deputy.id] === 'Não') {
        state.no.push(deputy);
      } else if (votesArray[deputy.id] === 'Abstenção') {
        state.abstation.push(deputy);
      } else if (votesArray[deputy.id] === 'null') {
        state.absent.push(deputy);
      }
    });
    this.setState(state)
  }

  async handleClick(event){
    const emailContent = {
      project: this.props.project,
      vote: event.target.name,
      listDeputies: this.state[event.target.name]
    }
    const response = await axios.post('/email', emailContent)
    if(response.status === 204){
      console.log('e-mail sent')
    } else if((response.status === 500)){
      console.log('email not sent')
    }

  }

  render() {
    return (
      <div>
      <h2>Voted Yes:</h2>
      {this.state.yes.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <button name='yes' onClick={this.handleClick}>Support these votes</button>
      <h2>Voted No:</h2>
      {this.state.no.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <button name='no' onClick={this.handleClick}>Support these votes</button>
      <h2>Absent:</h2>
      {this.state.absent.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <button name='absent' onClick={this.handleClick}>Support these votes</button>
      <h2>Didn't vote:</h2>
      {this.state.abstation.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <button name='abstation' onClick={this.handleClick}>Support these votes</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deputies: state.deputies.list,
  };
};

export default connect(mapStateToProps)(Voters);