import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import NavBar from './navBar'
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const initialState = {
  electoralNumber: '',
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '50px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class MyPoliticians extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      electoralNumber: event.target.value,
    });

  }

  render() {
    const { electoralNumber } = this.state
    const { list, alliances, classes } = this.props
    const [votedFor] = list.filter(party => {
      return party.electoralNumber === Number(electoralNumber.substring(0,2))
    })
    let alliance, allies;
    if(votedFor && votedFor.allianceId) {
      [alliance] = alliances.filter(al => {
        return al.id === votedFor.allianceId
      })
      allies = list.filter(party => {
        return party.allianceId === alliance.id
      })
    }
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id='with-placeholder'
          label='You voted'
          placeholder='CandidateNumber'
          className={classes.textFiled}
          margin='normal'
          name="electoralNumber"
          value={this.state.electoralNumber}
          onChange={this.handleChange}
        />
        </form>
        <div>
          {electoralNumber.length > 1 &&
          <div>
          <h3> {`Party Name: ${votedFor.shortName} - ${votedFor.name}`} </h3>
          <h2>Alliance: {alliance ? alliance.name : 'No alliance'} </h2>
          {alliance && allies.map(alley => {
            return <span key={alley.id}> {alley.shortName} </span>
          })
          }
          </div>
        }{
          electoralNumber.length > 1 &&
          <NavBar allies={allies} votedFor={votedFor}/>
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { list, alliances } = state.parties
  return {
    list, alliances
  }
}

MyPoliticians.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(MyPoliticians)));
