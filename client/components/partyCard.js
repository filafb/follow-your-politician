import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

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
  const { classes, alliance } = props;
  const bull = <span className={classes.bullet}>•</span>;
  console.log(alliance)
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Sua coligação:
          </Typography>
          <Typography variant="headline" component="h2">
          {`${alliance.allianceName}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Partidos:
          </Typography>
          {alliance.list && alliance.list.map(alley => {
            return <Typography key={alley.partyNumber} component="span"> {bull} {alley.partyName} </Typography>}
          )}
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { parties } = state
  return {
    alliance: parties.alliance
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));
