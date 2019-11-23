import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import DateTags from '../DateTags/DateTags';

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
    minHeight: '278px',
  },
  card: {
    width: '280px',
    border: '1px solid lightgray',
  },
  cardContent: {
    padding: '12px',
    backgroundColor: theme.palette.primary.contrastText,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '2px 16px',
    fontWeight: 600,
  },
  cardSubheader: {
    fontWeight: 300,
  },
  activitySection: {
    marginTop: '15px',
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
    height: '140px',
  },
  thumbnailContainer: {
    height: '100%',
    display: 'flex',
  },
  thumbnailImage: {
    flexShrink: 1,
    flexBasis: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  tagChip: {
    marginRight: theme.spacing(1),
    marginTop: '5px',
    height: '1.5rem',
  },
});

const DateCard = React.forwardRef(({ dateObj, classes }, ref) => {
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
    return (
      <CardActionArea className={classes.actionArea}>
        <CardMedia className={classes.media}>{renderThumbnails()}</CardMedia>
        <Typography variant="subtitle1" className={classes.cardHeader}>
          {dateObj.name}
        </Typography>
        <CardContent className={classes.cardContent}>
          <DateTags dateObj={dateObj} maxTags={3} />
        </CardContent>
      </CardActionArea>
    );
  }

  return (
    <div className={classes.container} ref={ref}>
      <Card className={classes.card} elevation={0} square>
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
