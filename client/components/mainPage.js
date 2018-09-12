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
import { states, stateNames } from './stateNames';

const initialState = {
  electoralNumber: '',
  state: '',
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
    textAlign: 'center'


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
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    if (name) {
      window.localStorage.setItem('state', value);
    }
  }

  render() {
    const { electoralNumber } = this.state;
    const { list, alliances, classes } = this.props;
    const [votedFor] = list.filter(party => {
      return party.electoralNumber === Number(electoralNumber.substring(0, 2));
    });
    let alliance, allies;
    if (votedFor && votedFor.allianceId) {
      [alliance] = alliances.filter(al => {
        return al.id === votedFor.allianceId;
      });
      allies = list.filter(party => {
        return party.allianceId === alliance.id;
      });
    }
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
              disabled={!this.state.state}
              value={this.state.electoralNumber}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <div>
          {electoralNumber.length > 1 && (
            <PartyCard
              votedFor={votedFor}
              alliance={alliance}
              allies={allies}
            />
          )}
          {electoralNumber.length > 1 && (
            <NavBar allies={allies} votedFor={votedFor} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { list, alliances } = state.parties;
  return {
    list,
    alliances,
  };
};

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(MainPage))
);
