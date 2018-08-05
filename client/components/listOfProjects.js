import React from 'react';
import Voters from './voters'

class ListOfProjects extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    const { projects } = this.props;
    return projects.map(project => {
      return (
        <div key={project.proposicao.id}>
        <div  onClick={this.handleClick}>
          <h3>
            Project: {project.proposicao.ementa} Status:{' '}
            {project.aprovada ? 'Approved' : 'Not Approved'}
          </h3>
          </div>
          <div>
          {!this.state.showDetails
            ? null
            : <Voters pollingId={project.id} project={project.proposicao.ementa}/>}
        </div>
        </div>
      );
    });
  }
}

export default ListOfProjects;
