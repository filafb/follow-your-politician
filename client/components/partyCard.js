import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: '15px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
  },
};

function SimpleCard(props) {
  const { classes, votedFor, alliance, allies } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Party you voted for:
          </Typography>
          <Typography variant="headline" component="h2">
          {`${votedFor.shortName} - ${votedFor.name}`}
          </Typography>
          {alliance && <Typography className={classes.pos} color="textSecondary">
            Alliance
          </Typography>}
          {alliance && allies.map(alley => {
            return <Typography key={alley.id} component="spam"> {bull} {alley.shortName} </Typography>}
          )}
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
