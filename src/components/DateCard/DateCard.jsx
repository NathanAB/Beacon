import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uniq, uniqBy, map } from 'lodash';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';

import Store from '../../store';
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
    width: '100%',
    position: 'relative',
    overflow: 'visible',
    margin: 'auto',
    border: '1px solid lightgray',
  },
  cardContent: {
    width: '100%',
    maxWidth: 'calc(100% - 32px)',
    padding: '0.5rem 1rem',
    backgroundColor: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
      width: 'auto',
      maxWidth: 'auto',
    },
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
  planDateButton: {
    display: 'block',
    margin: 'auto',
    marginTop: '2em',
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
  tagChip: {
    marginRight: theme.spacing(1),
    marginTop: '5px',
    height: '1.5rem',
  },
  expandedContent: {
    padding: 0,
    paddingTop: '1rem',
  },
  cardActions: {
    paddingTop: 0,
  },
});

const DateCard = React.forwardRef(
  ({ dateObj, classes, noExpand, onClick, defaultExpanded }, ref) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const store = Store.useStore();
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

    function renderAllTags() {
      let tags = [];
      dateObj.sections.forEach(section => {
        tags.push(...section.tags);
      });
      tags = uniqBy(tags, tag => tag.name);
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
            style={{ backgroundImage: `url(${imageUrl || placeholderImg})` }}
          />
        );
      });
      return <div className={classes.thumbnailContainer}>{thumbnails}</div>;
    }

    function renderExpanded() {
      const sectionList = dateObj.sections.map(section => {
        const duration = Math.round(section.minutes / 30) / 2; // Round to the nearest half-hour
        const costString = costToString(section.cost);
        return (
          <div className={classes.activitySection} key={section.spot.name}>
            <Typography variant="body2" className={classes.activityTitle}>
              <span className={classes.activityName}>{section.spot.name}</span>
              <span className={classes.activityCost}>
                {costString} • {duration} hours
              </span>
            </Typography>
            <Typography variant="body2">{section.description}</Typography>
          </div>
        );
      });
      return (
        <Collapse in={isExpanded}>
          <CardContent className={classes.expandedContent}>
            <Typography variant="body2">{dateObj.description}</Typography>
            {sectionList}
            <Button
              variant="contained"
              aria-label="Add this spot"
              color="primary"
              size="medium"
              className={classes.planDateButton}
              onClick={checkoutDate}
            >
              Add this Date
            </Button>
          </CardContent>
        </Collapse>
      );
    }

    function renderMain() {
      const { sections } = dateObj;
      const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
      const dateHours = Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
      const dateCost =
        sections.reduce((total, section) => total + section.cost, 0) / sections.length;
      const dateCostString = costToString(dateCost);
      const dateLocations = uniq(map(sections, 'spot.neighborhood.name')).join(', ');
      return (
        <CardActionArea
          onClick={() => {
            onClick();
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
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardHeader}>
              {dateObj.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom className={classes.cardSubheader}>
              {`${dateLocations} • ${dateHours} hrs • ${dateCostString}`}
            </Typography>
            {renderAllTags()}
            {renderExpanded()}
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
  },
);

DateCard.propTypes = {
  classes: PropTypes.object,
  dateObj: PropTypes.object.isRequired,
  noExpand: PropTypes.bool,
  onClick: PropTypes.func,
  defaultExpanded: PropTypes.bool,
};

DateCard.defaultProps = {
  classes: {},
  noExpand: false,
  onClick: () => {},
  defaultExpanded: false,
};

export default withStyles(styles)(DateCard);
