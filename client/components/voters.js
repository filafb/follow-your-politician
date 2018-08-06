import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContentText, DialogContent } from '@material-ui/core';

const initialState = {
  yes: [],
  no: [],
  abstation: [],
  absent: [],
  sent: false
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
      this.setState({sent: true})
    } else if((response.status === 500)){
      console.log('email not sent')
    }

  }

  handlClose = () => {
    this.setState({sent: false})
  }

  render() {
    return (
      <div className='voters-colunm'>
      <div>
      <h2>Voted Yes:</h2>
      {this.state.yes.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <Button variant='contained' color='primary' name='yes' onClick={this.handleClick}>Support these votes</Button>
      </div>
      <div>
      <h2>Voted No:</h2>
      {this.state.no.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <Button variant='contained' color='primary' name='no' onClick={this.handleClick}>Support these votes</Button >
      </div>
      <div>
      <h2>Absent:</h2>
      {this.state.absent.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <Button variant='contained' color='primary' name='absent' onClick={this.handleClick}>Support these votes</Button >
      </div>
      <div>
      <h2>Didn't vote:</h2>
      {this.state.abstation.map(deputy => (<li key={deputy.id}>{deputy.nome}</li>))}
      <Button variant='contained' color='primary' name='abstation' onClick={this.handleClick}>Support these votes</Button >
      </div>
      <Dialog
      open={this.state.sent}
      onClose={this.handlClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id='alert-dialog-title'>E-mail sent!</DialogTitle>
      <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thanks for supporting our democracy!
            </DialogContentText>
          </DialogContent>
      </Dialog>
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
