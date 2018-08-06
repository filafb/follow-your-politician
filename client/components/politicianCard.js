import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  card: {
    width: 300,
    height: 180,
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  avatar: {
    width: 60,
    height: 60,
    alignSelf: 'center'
  },
  name:{
    alignSelf: 'center'
  },
  boxName: {
    display: 'flex',
    flexDirection: 'column'
  }

};

function PoliticianCard(props) {
  const { classes, deputy } = props;
  return (
    <div>
      <Card className={classes.card}>
        <Avatar
          className={classes.avatar}
          src={deputy.urlFoto}
          alt={deputy.nome}
        />
        <CardContent className={classes.boxName}>
          <Typography gutterBottom variant="headline" component="h4" className={classes.name} >
            {deputy.nome}
          </Typography>
          <Typography component="p" className={classes.name}>Party: {deputy.siglaPartido}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

PoliticianCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PoliticianCard);
