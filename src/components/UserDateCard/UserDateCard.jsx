import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import moment from 'moment';
import { uniq, uniqBy, map } from 'lodash';

import Store from '../../store';
import { costToString } from '../../utils';

const styles = theme => ({
  card: {
    width: '320px',
    'max-width': '100%',
    position: 'relative',
    overflow: 'visible',
    margin: 'auto',
    border: '1px solid lightgray',
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeaderText: {
    color: theme.palette.primary.contrastText,
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
});

function UserDateCard({ classes, userDate }) {
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const dateObj = dateObjs.find(d => d.id === userDate.dateId);

  // TODO - dedupe below with DateCard
  const { sections } = dateObj;
  const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
  const dateHours = Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
  const dateCost = sections.reduce((total, section) => total + section.cost, 0) / sections.length;
  const dateCostString = costToString(dateCost);
  const dateLocations = uniq(map(sections, 'spot.neighborhood.name')).join(', ');

  function renderAllTags() {
    let tags = [];
    dateObj.sections.forEach(section => {
      tags.push(...section.tags);
    });
    tags = uniqBy(tags, tag => tag.name);
    tags = tags.slice(0, 3);

    return tags.map(tag => <Chip label={tag.name} className={classes.tagChip} />);
  }

  return (
    <Card elevation={3} className={classes.card}>
      <CardContent className={classes.cardHeader}>
        <Typography variant="h5" className={classes.cardHeaderText}>
          {userDate.name}
        </Typography>
        <Typography variant="subtitle2" className={classes.cardHeaderText}>
          {moment(userDate.day).format('dddd, MMMM Do')}
        </Typography>
        <Typography variant="subtitle2" className={classes.cardHeaderText}>
          {moment(userDate.time).format('h:mm a')}
        </Typography>
        <Typography variant="body2" className={[classes.cardHeaderText, classes.italic]}>
          {userDate.notes}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="subtitle2" className={classes.dateTitle}>{dateObj.name}</Typography>
        <Typography variant="subtitle2" gutterBottom>
          {`${dateLocations} • ${dateHours} hrs • ${dateCostString}`}
        </Typography>
        {renderAllTags()}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(UserDateCard);
