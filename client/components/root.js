import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MyPoliticians from './myPoliticians';
import { loadParties } from '../reducers/partiesReducer';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Root extends Component {
  componentDidMount() {
    this.props.loadParties();
  }
  render() {
    return (
      <main>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Follow Your Politician
            </Typography>
          </Toolbar>
        </AppBar>
        <MyPoliticians />
      </main>
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
