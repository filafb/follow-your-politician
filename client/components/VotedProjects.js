import React from 'react'
import { connect } from 'react-redux'
import { fetchVotedProjects } from '../reducers/projectsReducer'
import ListOfProjects from './listOfProjects'

class VotedProjects extends React.Component {
  componentDidMount(){
    this.props.fetchVotedProjects()
  }
  render(){
    const { votedProjects } = this.props
    return (
      <ListOfProjects projects={votedProjects} />
    )
  }
}

const mapStateToProps = state => {
  return{
    votedProjects: state.projects.votedProjects
  }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchVotedProjects: () => dispatch(fetchVotedProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotedProjects)

