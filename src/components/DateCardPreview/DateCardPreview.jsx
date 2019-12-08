import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
  card: {
    width: '280px',
    border: '1px solid lightgray',
  },
  cardContent: {
    padding: '16px',
    backgroundColor: theme.palette.primary.contrastText,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '6px 16px',
    fontWeight: 600,
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
});

const DateCard = React.forwardRef(({ dateObj, classes }, ref) => {
  function renderThumbnails() {
    // eslint-disable-next-line arrow-body-style
    const thumbnails = dateObj.sections.map(section => {
      const placeholderImg = `https://instagram.com/p/${
        testImages[Math.floor(section.spotId % 9)]
      }/media/?size=m`;

      const imageUrl = section.image
        ? `https://instagram.com/p/${section.image}/media/?size=m`
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
          {dateObj.name} <br />
          <DateTags variant="outlined" color="secondary" dateObj={dateObj} maxTags={0} />
        </Typography>
        {/* <CardContent className={classes.cardContent}>
          <DateTags dateObj={dateObj} maxTags={3} tagsOnly />
        </CardContent> */}
      </CardActionArea>
    );
  }

  return (
    <div ref={ref}>
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
