import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PeopleIcon from '@material-ui/icons/People';
import ListIcon from '@material-ui/icons/List';
import { Menu, MenuItem } from '@material-ui/core';

const styles = {
  root: {
    width: '100vw',
    backgroundColor: 'lightgray'
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: '',
    anchorEl: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = event => {
    this.setState( { anchorEl: event.currentTarget})
  }

  handleClose =(status) => {
    this.setState({ anchorEl: null})
    this.props.clickProjects(status)
  }

  render() {
    const { classes, clickDeputies } = this.props;
    const { value } = this.state;

    return (
      <div>
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="You Elected" icon={<PeopleIcon />} onClick={ clickDeputies} />
        <BottomNavigationAction label="Projects" icon={<ListIcon />} onClick={this.handleClick}/>
        </BottomNavigation>
        <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
        >
        <MenuItem name='voted' onClick={() => this.handleClose('voted')}>Voted</MenuItem>
        <MenuItem name='toBeVoted' onClick={() => this.handleClose('toBeVoted')}>To Be Voted</MenuItem>
        </Menu>
        </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
