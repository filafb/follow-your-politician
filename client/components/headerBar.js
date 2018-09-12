import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default  function HeaderBar (props) {
  return (
    <AppBar position='static'>
    <Toolbar>
      <Typography variant='title' color='inherit'>
      Para quem foi meu voto?
      </Typography>
    </Toolbar>
    </AppBar>
  )
}
