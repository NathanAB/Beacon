import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { Stepper, Step, StepLabel, StepContent, Box } from '@material-ui/core';
import ReactGA from 'react-ga';

import Store from '../../store';
import { costToString, getIsDesktop } from '../../utils';
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
    position: 'relative',
    minHeight: '278px',
  },
  card: {
    width: '100%',
    position: 'relative',
    overflow: 'visible',
    margin: 'auto',
    border: '1px solid lightgray',
  },
  cardContent: {
    width: '100%',
    maxWidth: 'calc(100% - 32px)',
    paddingTop: '10px',
    paddingBottom: '5px !important',
    backgroundColor: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
      width: 'auto',
      maxWidth: 'auto',
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '2px 16px',
    'font-weight': 600,
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
  planDateButton: {
    display: 'block',
    margin: '16px auto',
    textTransform: 'uppercase',
  },
  actionArea: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'stretch',
      display: 'flex',
    },
  },
  media: {
    minHeight: '160px',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
  thumbnailContainer: {
    minHeight: '160px',
    height: '100%',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      width: '350px',
    },
  },
  thumbnailImage: {
    'flex-shrink': 1,
    'flex-basis': '100%',
    'background-position': 'center',
    'background-size': 'cover',
  },
  cardActions: {
    paddingTop: 0,
  },
  dateSteps: {
    padding: '10px 0',
  },
});

const DateCard = React.forwardRef(({ dateObj, classes, noExpand, defaultExpanded }, ref) => {
  const store = Store.useStore();
  const isDesktop = getIsDesktop();
  const user = store.get('user');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  function checkoutDate(e) {
    e.stopPropagation();
    if (user) {
      ReactGA.event({
        category: 'Interaction',
        action: 'Begin Checkout',
        label: dateObj.name,
      });
      store.set('checkoutDate')(dateObj);
    } else {
      ReactGA.event({
        category: 'Interaction',
        action: 'Open Login Dialog',
        label: 'Discover Page',
      });
      store.set('isLoginDialogOpen')(true);
    }
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
          style={{ backgroundImage: `url(${imageUrl || placeholderImg})` }}
        />
      );
    });
    return <div className={classes.thumbnailContainer}>{thumbnails}</div>;
  }

  function renderExpanded() {
    return (
      <Collapse in={isExpanded}>
        <Typography variant="body2">{dateObj.description}</Typography>
        <Stepper nonLinear orientation="vertical" className={classes.dateSteps}>
          {dateObj.sections.map(section => {
            const duration = Math.round(section.minutes / 30) / 2; // Round to the nearest half-hour
            const costString = costToString(section.cost);
            return (
              <Step active key={section.spot.name}>
                <StepLabel>
                  <Typography variant="subtitle2">
                    <strong>{section.spot.name}</strong> <br /> {costString} | {duration} hours
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2">{section.description}</Typography>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        <Button
          variant="contained"
          aria-label="Add this spot"
          color="primary"
          size="medium"
          className={classes.planDateButton}
          onClick={checkoutDate}
          fullWidth={!isDesktop}
        >
          Add this Date
        </Button>
      </Collapse>
    );
  }

  function renderMain() {
    return isDesktop ? (
      <>
        <Box display="flex">
          <CardMedia className={classes.media}>{renderThumbnails()}</CardMedia>
          <Box display="flex" flexDirection="column">
            <Typography variant={isDesktop ? 'h6' : 'subtitle1'} className={classes.cardHeader}>
              {dateObj.name}
            </Typography>
            <CardContent className={classes.cardContent}>
              <DateTags dateObj={dateObj} />
            </CardContent>
            <CardContent className={classes.cardContent}>{renderExpanded()}</CardContent>
          </Box>
        </Box>
      </>
    ) : (
      <>
        <CardActionArea
          onClick={() => {
            ReactGA.event({
              category: 'Interaction',
              action: isExpanded ? 'Collapse Date' : 'Expand Date',
              label: dateObj.name,
            });
            return !noExpand && !isDesktop && setIsExpanded(!isExpanded);
          }}
          className={classes.actionArea}
        >
          <CardMedia className={classes.media}>{renderThumbnails()}</CardMedia>
          <Typography variant={isDesktop ? 'h6' : 'subtitle1'} className={classes.cardHeader}>
            {dateObj.name}
          </Typography>
          <CardContent className={classes.cardContent}>
            <DateTags dateObj={dateObj} />
          </CardContent>
        </CardActionArea>
        <CardContent className={classes.cardContent}>{renderExpanded()}</CardContent>
      </>
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
  noExpand: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
};

DateCard.defaultProps = {
  classes: {},
  noExpand: false,
  defaultExpanded: false,
};

export default withStyles(styles)(DateCard);
