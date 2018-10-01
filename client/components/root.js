import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from './mainPage';
import HeaderBar from './headerBar'

class Root extends Component {
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

export default withRouter(Root)

