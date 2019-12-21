import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, IconButton, Icon, Box } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import moment from 'moment';
import ReactGA from 'react-ga';

import Store from '../../store';
import DateMap from './components/DateMap/DateMap';
import DateTags from '../DateTags/DateTags';

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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingRight: '28px',
  },
  cardHeaderDivider: {
    margin: '10px 0',
  },
  italic: {
    fontStyle: 'italic',
  },
  editButton: {
    color: 'white',
    top: '5px',
    position: 'absolute',
    right: '5px',
    backgroundColor: 'transparent !important',
  },
  dateSteps: {
    padding: '10px 0',
  },
});

function MyDateCard({ classes, userDate }) {
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const dateObj = dateObjs.find(d => d.id === userDate.dateId);

  if (!dateObj) {
    return (
      <Card elevation={0} className={classes.card} square>
        <div className={classes.cardHeader}>
          <DateMap className={classes.cardHeader} placeIds={[]} />
        </div>
        <CardContent className={classes.cardHeader}>
          <Typography variant="h6">Loading date...</Typography>
        </CardContent>
      </Card>
    );
  }

  const { sections } = dateObj;
  const placeIds = sections.map(s => s.spot.placeId);

  const editDate = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Edit User Date',
      label: userDate.dateId.toString(),
    });
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
    <Card elevation={0} className={classes.card} square>
      <div className={classes.cardHeader}>
        <DateMap className={classes.cardHeader} placeIds={placeIds} />
      </div>
      <Box className={classes.cardHeader}>
        <CardContent className={classes.cardHeaderText}>
          <Typography variant="h5">{userDate.name}</Typography>
          <Typography variant="subtitle2">
            {moment(userDate.startTime).format('dddd, MMMM Do')}
          </Typography>
          <Typography variant="subtitle2">{moment(userDate.startTime).format('h:mm a')}</Typography>
          <Typography
            variant="body2"
            className={[classes.cardHeaderText, classes.italic].join(' ')}
          >
            {userDate.notes}
          </Typography>
        </CardContent>
        <CardContent>
          <IconButton className={classes.editButton} onClick={editDate} color="primary">
            <Icon>edit</Icon>
          </IconButton>
          <DateTags dateObj={dateObj} maxTags={0} paddingBottom="10px" />
          <Typography variant="body2">{dateObj.description}</Typography>
          {renderSections()}
        </CardContent>
      </Box>
    </Card>
  );
}

export default withStyles(styles)(MyDateCard);
