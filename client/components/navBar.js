import React from 'react'
import ListOfPoliticians from './listOfPoliticians'
import BottomNav from './bottomNav'
import VotedProjects from './VotedProjects'
import ToBeVotedProjects from './ToBeVotedProjects'



const initialState = {
  deputiesView: false,
  projectsView: false,
  projectStatus: ""
}


class NavBar extends React.Component {
  constructor(){
    super()
    this.state = initialState;
    this.handleClickDeputies = this.handleClickDeputies.bind(this)
    this.handleClickProjects = this.handleClickProjects.bind(this)
  }

  handleClickDeputies(){
    this.setState({
      deputiesView: true,
      projectsView: false
    })
  }
  handleClickProjects(name){
    this.setState({
      deputiesView: false,
      projectsView: true,
      projectStatus: name
    })
  }

  render(){
    return (
      <div>
        <BottomNav clickDeputies={this.handleClickDeputies} clickProjects={this.handleClickProjects} />
      <div>
      {this.state.deputiesView &&
        <ListOfPoliticians {...this.props} />
      }
      {this.state.projectStatus === 'voted' &&
        <VotedProjects />
      }
      {this.state.projectStatus === 'toBeVoted' &&
        <ToBeVotedProjects />
      }
      </div>
      </div>
    )

  }
}

export default NavBar
