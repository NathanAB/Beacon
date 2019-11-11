import React from 'react';
import PropTypes from 'prop-types';
import { uniq, uniqBy, map } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { costToString } from '../../utils';

const testImages = [
  'B3SmuPzFijg',
  'B3SmsUDlZf_',
  'B3Smq1Tl0hc',
  'B3Smoh8l6AY',
  'B3Smm19le66',
  'B3Smks7lZXU',
  'B3SmimgFJrr',
  'B3Smg32lZJ4',
  'B3SmeUhFcZm',
];

const styles = theme => ({
  container: {
    position: 'relative',
    minHeight: '278px',
  },
  card: {
    width: '320px',
    'max-width': '100%',
    position: 'relative',
    overflow: 'visible',
    margin: 'auto',
    border: '1px solid lightgray',
  },
  cardContent: {
    width: '318px',
    maxWidth: 'calc(100% - 32px)',
    padding: '0.5rem 1rem',
    backgroundColor: theme.palette.primary.contrastText,
  },
  cardHeader: {
    'text-transform': 'uppercase',
    'font-weight': 400,
  },
  cardSubheader: {
    'font-weight': 300,
  },
  activitySection: {
    'margin-top': '15px',
  },
  activityTitle: {
    padding: '0.5rem 1rem',
    margin: '1rem 0',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.text,
    borderRadius: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  activityName: {
    textTransform: 'uppercase',
  },
  activityCost: {
    textTransform: 'capitalize',
  },
  actionArea: {
    width: '100%',
  },
  media: {
    height: '160px',
  },
  thumbnailContainer: {
    height: '100%',
    display: 'flex',
  },
  thumbnailImage: {
    'flex-shrink': 1,
    'flex-basis': '100%',
    'background-position': 'center',
    'background-size': 'cover',
  },
  tagChip: {
    marginRight: theme.spacing(1),
    marginTop: '5px',
    height: '1.5rem',
  },
});

const DateCard = React.forwardRef(({ dateObj, classes }, ref) => {
  function renderAllTags() {
    let tags = [];
    dateObj.sections.forEach(section => {
      tags.push(...section.tags);
    });
    tags = uniqBy(tags, tag => tag.name);

    // Don't show all the tags
    tags = tags.slice(0, 3);

    return tags.map(tag => <Chip key={tag.name} label={tag.name} className={classes.tagChip} />);
  }

  function renderThumbnails() {
    // eslint-disable-next-line arrow-body-style
    const thumbnails = dateObj.sections.map(section => {
      const placeholderImg = `https://instagram.com/p/${
        testImages[Math.floor(section.spotId % 9)]
      }/media/?size=l`;

      const imageUrl = section.image
        ? `https://instagram.com/p/${section.image}/media/?size=l`
        : placeholderImg;

      return (
        <div
          className={classes.thumbnailImage}
          key={section.spot.name}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      );
    });
    return <div className={classes.thumbnailContainer}>{thumbnails}</div>;
  }

  function renderMain() {
    const { sections } = dateObj;
    const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
    const dateHours = Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
    const dateCost = sections.reduce((total, section) => total + section.cost, 0) / sections.length;
    const dateCostString = costToString(dateCost);
    const dateLocations = uniq(map(sections, 'spot.neighborhood.name')).join(', ');
    return (
      <CardActionArea className={classes.actionArea}>
        <CardMedia className={classes.media}>{renderThumbnails()}</CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" className={classes.cardHeader}>
            {dateObj.name}
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.cardSubheader}>
            {`${dateLocations} • ${dateHours} hrs • ${dateCostString}`}
          </Typography>
          {renderAllTags()}
        </CardContent>
      </CardActionArea>
    );
  }

  return (
    <div className={classes.container} ref={ref}>
      <Card className={classes.card} elevation={3}>
        {renderMain()}
      </Card>
    </div>
  );
});

DateCard.propTypes = {
  classes: PropTypes.object,
  dateObj: PropTypes.object.isRequired,
};

DateCard.defaultProps = {
  classes: {},
};

export default withStyles(styles)(DateCard);
