import React from 'react'
import ListOfPoliticians from './listOfPoliticians'
import ProjectsNavBar from './projectsNavBar'


const initialState = {
  deputiesView: false,
  projectsView: false
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
  handleClickProjects(){
    this.setState({
      deputiesView: false,
      projectsView: true
    })
  }

  render(){
    return (
      <div>
      <header>
          <h3 onClick={this.handleClickDeputies}>You Elected</h3>
          <h3 onClick={this.handleClickProjects}>Projects</h3>
      </header>
      <div>
      {this.state.deputiesView &&
        <ListOfPoliticians {...this.props} />
      }
      {this.state.projectsView &&
        <ProjectsNavBar />
      }
      </div>
      </div>
    )

  }
}

export default NavBar
