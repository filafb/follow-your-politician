import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

const styles = {
  card: {
    width: 300,
    height: 180,
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  name: {
    alignSelf: 'center',
  },
  boxName: {
    display: 'flex',
    flexDirection: 'column',
  },
};

function PoliticianCard(props) {
  let { classes, electoralNumber, candidates } = props;
  let hasCandidate = false;
  if (electoralNumber.length === 4) {
    let number = Number(electoralNumber);
    hasCandidate = true;
    candidates = [
      ...candidates.filter(cand => cand.numero === number),
      ...candidates.filter(cand => cand.numero !== number),
    ];
  }
  console.log(candidates);
  return (
    <div>
      {candidates.map((candidate, idx) => {
        return (
          <Card className={classes.card} key={candidate.id}>
            <Typography
                gutterBottom
                variant="headline"
                component="h3"
                className={classes.name}
              >
              {hasCandidate && idx === 0 && 'Seu Candidato:'}
              </Typography>
            <Avatar
              className={classes.avatar}
              src={candidate.fotoUrl}
              alt={candidate.nomeUrna}
            />
            <CardContent className={classes.boxName}>
              <Typography
                gutterBottom
                variant="headline"
                component="h4"
                className={classes.name}
              >
                {candidate.nomeUrna}
              </Typography>
              <Typography component="p" className={classes.name}>
                Partido: {candidate.partido.sigla}
              </Typography>
              <Typography component="p" className={classes.name}>
                Reeleição: {candidate.st_REELEICAO ? 'Sim' : 'Não'}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

PoliticianCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { candidates } = state;
  return {
    candidates: candidates.filtered,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PoliticianCard));
