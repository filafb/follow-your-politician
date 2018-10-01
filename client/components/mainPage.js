import assert from 'assert';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './navBar';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PartyCard from './partyCard';
import { stateNames } from './stateNames';
import {
  fetchCandidates,
  getMyCandidates,
} from '../reducers/candidatesReducer';
import { getAlliances } from '../reducers/partiesReducer'

const initialState = {
  electoralNumber: '',
  state: '',
  errorMessage: '',
  candidate: {},
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '50px',
    marginTop: '20px',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '250px',
  },
  menu: {
    width: '200px',
  },
});

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let state = window.localStorage.getItem('state');
    if (state) {
      this.setState({ state });
      this.props.fetchCandidates(state);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    if (name === 'state') {
      window.localStorage.setItem('state', value);
      this.props.fetchCandidates(value);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { candidates, parties, alliance } = this.props;
    const { electoralNumber } = this.state;
    let party, allianceName, myCandidates, getAlliance
    if (prevState.electoralNumber !== electoralNumber) {
      this.setState({candidate: {}})
      if (electoralNumber.length === 2 && electoralNumber.substring(0, 2) !== prevState.electoralNumber) {
        const partyNumber = Number(electoralNumber.substring(0, 2));
        try {
          party = parties.filter(party => party.partyNumber === partyNumber);
          assert(party[0] !== undefined, 'Partido / Coligação não existe');
          allianceName = party[0].alliance;
          getAlliance = parties.filter(p => allianceName === p.alliance);
          myCandidates = candidates.filter(candidate => {
            return candidate.nomeColigacao === allianceName;
          });
          if(allianceName !== alliance.allianceName){
            this.props.candDetailed(myCandidates, this.state.state);
            this.props.getAlliances(allianceName, getAlliance)
          }
        } catch (err) {
          this.setState({errorMessage: 'Partido Não Existente'})
          console.log('err', err.message);
        }
      }
      if (electoralNumber.length >= 4) {
        const [candidate] = candidates.filter(
          cand => Number(electoralNumber) === cand.numero
        );
        if (candidate.numero) {
          this.setState({ candidate });
        } else {
          this.setState({ errorMessage: 'Candidato não encontrado' });
        }
      }
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <FormControl className={classes.menu}>
              <InputLabel>Seu Estado</InputLabel>
              <Select
                value={this.state.state}
                onChange={this.handleChange}
                name="state"
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                {stateNames.map(state => {
                  return (
                    <MenuItem key={state.initials} value={state.name}>
                      {state.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              id="with-placeholder"
              label="Seu voto para deputado federal"
              placeholder="Número do Candidato"
              className={classes.textField}
              margin="normal"
              name="electoralNumber"
              inputProps={{
                maxLength: 4,
              }}
              disabled={!this.state.state}
              value={this.state.electoralNumber}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <div>
          {/* {electoralNumber.length > 1 && (
            <PartyCard
              votedFor={votedFor}
              alliance={alliance}
              allies={allies}
            />
          )}
          {electoralNumber.length > 1 && (
            <NavBar allies={allies} votedFor={votedFor} />
          )} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { candidates, parties} = state;
  return {
    candidates: candidates.listAll,
    parties: parties.list,
    alliance: parties.alliance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCandidates: state => dispatch(fetchCandidates(state)),
    candDetailed: (list, state) => dispatch(getMyCandidates(list, state)),
    getAlliances: (allianceName, list) => dispatch(getAlliances(allianceName, list))
  };
};

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MainPage))
);
