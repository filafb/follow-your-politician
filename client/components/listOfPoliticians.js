import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadDeputies } from '../reducers/deputiesReducer';

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
      <h2>You elected:</h2>
      <div>
        {deputies.map(deputy => {
          return (
            <div key={deputy.id}>
              <div>
                <img src={deputy.urlFoto} alt="image" />
              </div>
              <div>
                <h3>{deputy.nome}</h3>
                <h2>{deputy.siglaPartido}</h2>
              </div>
            </div>
          );
        })}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListOfPoliticians)
);
