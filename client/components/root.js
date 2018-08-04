import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MyPoliticians from './myPoliticians'
import { loadParties } from '../reducers/partiesReducer'

class Root extends Component {
  componentDidMount() {
    this.props.loadParties()
  }
  render() {
    return (
      <main>
        <MyPoliticians />
      </main>
    );
  }
}

const mapDispatchToPros = dispatch => {
  return{
    loadParties() {
      dispatch(loadParties())
    }
  }
}


export default withRouter(connect(null, mapDispatchToPros)(Root))
