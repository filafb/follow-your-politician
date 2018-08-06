import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadDeputies } from '../reducers/deputiesReducer';
import PoliticianCard from './politicianCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class ListOfPoliticians extends Component {

  componentDidMount() {
    const { allies, votedFor } = this.props;
    let alliesList = [];
    if (allies) {
      alliesList = allies.map(ally => {
        return ally.shortName;
      });
    }
    const parties = [votedFor.shortName, ...alliesList].filter(
      (el, idx, self) => {
        if (idx === self.indexOf(el)) return el;
      }
    );
    if (votedFor) {
      this.props.loadDeputies(parties);
    }
  }
  render() {
    const { deputies } = this.props;
    return (
      <div>
      <div className='row'>
      {
        !deputies.length ? <CircularProgress className={this.props.classes.progress}/> :
        deputies.map(deputy => {
          return (
            <PoliticianCard key={deputy.id} deputy={deputy} />
          );
        })

      }
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deputies: state.deputies.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDeputies: parties => dispatch(loadDeputies(parties)),
  };
};

ListOfPoliticians.propTypes ={
  classes: PropTypes.object.isRequired
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ListOfPoliticians))
);
