import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Divider, Typography, IconButton, Icon } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Store from '../../store';
import DateMap from './components/DateMap/DateMap';

const styles = theme => ({
  card: {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'visible',
    margin: 'auto',
    border: '1px solid lightgray',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: '100%',
      marginBottom: '50px',
    },
  },
  cardHeader: {
    minHeight: '200px',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      width: '50%',
    },
    position: 'relative',
  },
  cardHeaderText: {
    // color: theme.palette.primary.contrastText,
    marginRight: '28px',
  },
  cardHeaderDivider: {
    margin: '10px 0',
  },
  italic: {
    fontStyle: 'italic',
  },
  tagChip: {
    marginRight: theme.spacing(1),
    marginTop: '5px',
    height: '1.5rem',
  },
  dateTitle: {
    textTransform: 'uppercase',
  },
  editButton: {
    top: '5px',
    position: 'absolute',
    right: '5px',
    color: 'white',
  },
  dateSteps: {
    padding: '10px 0',
  },
});

function UserDateCard({ classes, userDate }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const dateObj = dateObjs.find(d => d.id === userDate.dateId);

  // TODO - dedupe below with DateCard
  const { sections } = dateObj;
  const placeIds = sections.map(s => s.spot.placeId);

  const editDate = () => {
    store.set('editDate')(userDate);
  };

  const renderSections = () => {
    return (
      <Stepper nonLinear orientation="vertical" className={classes.dateSteps}>
        {sections.map(section => {
          return (
            <Step active key={section.spot.name}>
              <StepLabel>{section.spot.name}</StepLabel>
              <StepContent>
                <Typography variant="body2">{section.description}</Typography>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    );
  };

  return (
    <Card elevation={3} className={classes.card}>
      <div className={classes.cardHeader}>
        <DateMap className={classes.cardHeader} placeIds={placeIds} />
      </div>
      <CardContent className={classes.cardHeader}>
        <IconButton className={classes.editButton} onClick={editDate} color="primary">
          <Icon color="primary">edit</Icon>
        </IconButton>
        <Typography variant="h5" className={classes.cardHeaderText}>
          {userDate.name}
        </Typography>
        <Typography variant="subtitle2" className={classes.cardHeaderText}>
          {moment(userDate.startTime).format('dddd, MMMM Do')}
        </Typography>
        <Typography variant="subtitle2" className={classes.cardHeaderText}>
          {moment(userDate.startTime).format('h:mm a')}
        </Typography>
        <Typography variant="body2" className={[classes.cardHeaderText, classes.italic].join(' ')}>
          {userDate.notes}
        </Typography>
        <Divider className={classes.cardHeaderDivider} />
        {/* <Typography variant="h6" className={classes.dateTitle}>
          {dateObj.name}
        </Typography> */}
        <Typography variant="body2">{dateObj.description}</Typography>
        {renderSections()}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(UserDateCard);
