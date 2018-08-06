import React from 'react'
import VotedProjects from './VotedProjects'
import ToBeVotedProjects from './ToBeVotedProjects'
import { withRouter } from 'react-router-dom'

const initialState = {
  voted: false,
  toBeVoted: false
}


class ProjectsNavBar extends React.Component {
  constructor(){
    super()
    this.state = initialState;
  }

  componentDidMount(){
    this.props.projectStatus === 'voted'
    ? this.setState({
      voted: true,
      toBeVoted: false
    })
    : this.setState({
      voted: false,
      toBeVoted: true
    })
  }

  render(){
    return (
      <div>
      {this.state.voted &&
        <VotedProjects />
      }
      {this.state.toBeVoted &&
        <ToBeVotedProjects />
      }
      </div>
    )

  }
}

export default withRouter(ProjectsNavBar)
