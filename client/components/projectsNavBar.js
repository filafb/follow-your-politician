import React from 'react'
import VotedProjects from './VotedProjects'
import ToBeVotedProjects from './ToBeVotedProjects'

const initialState = {
  voted: false,
  toBeVoted: false
}


class ProjectsNavBar extends React.Component {
  constructor(){
    super()
    this.state = initialState;
    this.handleClickVoted = this.handleClickVoted.bind(this)
    this.handleClickToBeVoted = this.handleClickToBeVoted.bind(this)
  }

  handleClickVoted(){
    this.setState({
      voted: true,
      toBeVoted: false
    })
  }
  handleClickToBeVoted(){
    this.setState({
      voted: false,
      toBeVoted: true
    })
  }

  render(){
    return (
      <div>
      <header>
          <h3 onClick={this.handleClickVoted}>Voted</h3>
          <h3 onClick={this.handleClickToBeVoted}>To be voted</h3>
      </header>
      <div>
      {this.state.voted &&
        <VotedProjects />
      }
      {this.state.toBeVoted &&
        <ToBeVotedProjects />
      }
      </div>
      </div>
    )

  }
}

export default ProjectsNavBar
