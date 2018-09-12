import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from './mainPage';
import { loadParties } from '../reducers/partiesReducer';
import HeaderBar from './headerBar'

class Root extends Component {
  componentDidMount() {
    this.props.loadParties();
  }
  render() {
    return (
      <React.Fragment>
        <HeaderBar />
        <MainPage />
        <main>
          <Redirect to='/' />
        </main>
      </React.Fragment>

    );
  }
}

const mapDispatchToPros = dispatch => {
  return {
    loadParties() {
      dispatch(loadParties());
    },
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToPros
  )(Root)
);
