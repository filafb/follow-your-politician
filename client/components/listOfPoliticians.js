import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ListOfPoliticians extends Component {
  componentDidMount(){
    const {allies, votedFor } = this.props
    if(allies){
      const alliesList = allies.map(ally => {
        return ally.shortName
      })
      this.props.loadDeputys(alliesList)
    }
  }
  render(){
    return(<h1>List of Politicians </h1>)
  }
}

export default withRouter(connect()(ListOfPoliticians))
