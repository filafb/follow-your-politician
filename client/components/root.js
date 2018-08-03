import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import myPoliticians from './myPoliticians'
import { loadParties } from '../reducers/partiesReducer'

class Root extends Component {
  componentDidMount() {
    this.props.loadParties()
  }
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={myPoliticians} />
          <Redirect to ='/'/>
        </Switch>
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
