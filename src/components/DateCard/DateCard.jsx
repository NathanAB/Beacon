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
import { Stepper, Step, StepLabel, StepContent, Box, Icon, Link } from '@material-ui/core';
import ReactGA from 'react-ga';

import Store from '../../store';
import { getIsDesktop } from '../../utils';
import DateTags from '../DateTags/DateTags';

const testImages = [
  'B6YkdLGHhoV',
  'B6YkcEfnVdC',
  'B6Ykaq1Hoay',
  'B6YkZrxH8LT',
  'B6YkYtHH57R',
  'B6YkXxKnUw8',
  'B6YkWzZH1P3',
  'B6YkVw9nE6q',
  'B6YkUhWnZ95',
];

const styles = theme => ({
  container: {
    position: 'relative',
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
    padding: '6px 16px',
    fontWeight: 600,
  },
  cardHeaderText: {
    fontWeight: 600,
  },
  planDateButton: {
    display: 'block',
    margin: '16px auto',
    textTransform: 'none',
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
    position: 'relative',
    flexShrink: 1,
    flexBasis: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  dateSteps: {
    padding: '10px 0',
  },
  tagsContainer: {
    paddingBottom: '10px',
  },
  expando: {
    fontSize: '32px',
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
      let imageUrl;

      if (section.image) {
        imageUrl = `https://instagram.com/p/${section.image}/media/?size=m`;
      } else {
        // Use placeholder
        imageUrl = `https://instagram.com/p/${
          testImages[Math.floor(section.spotId % 9)]
        }/media/?size=m`;
      }

      return (
        <div
          className={classes.thumbnailImage}
          key={section.spot.name}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      );
    });
    return <div className={classes.thumbnailContainer}>{thumbnails}</div>;
  }

  function renderExpanded() {
    return (
      <Collapse in={isExpanded}>
        <CardContent className={classes.cardContent}>
          <Typography variant="body2">{dateObj.description}</Typography>
          <Stepper nonLinear orientation="vertical" className={classes.dateSteps}>
            {dateObj.sections.map(section => {
              return (
                <Step active key={section.spot.name}>
                  <StepLabel>
                    <Typography variant="subtitle2">
                      <strong>{section.spot.name}</strong> <br />{' '}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2">{section.description}</Typography>
                    {section.image && section.imageAuthor && (
                      <Typography variant="caption">
                        <i>
                          Photo:{' '}
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.imageAuthor}
                            href={`https://www.instagram.com/p/${section.image}`}
                          >{`@${section.imageAuthor}`}</Link>
                        </i>
                      </Typography>
                    )}
                    <DateTags paddingBottom="8px" singleRow sectionObj={section} />
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
            Go on this Date
          </Button>
        </CardContent>
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
              {dateObj.name} <br />{' '}
              <DateTags variant="outlined" color="secondary" dateObj={dateObj} maxTags={0} />
            </Typography>

            {renderExpanded()}
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
          <Box className={classes.cardHeader}>
            <Typography className={classes.cardHeaderText} variant={isDesktop ? 'h6' : 'subtitle1'}>
              {dateObj.name}
              <Box display="flex" justifyContent="space-between">
                <DateTags variant="outlined" color="secondary" dateObj={dateObj} maxTags={0} />
                {isExpanded ? (
                  <Icon className={classes.expando}>expand_less</Icon>
                ) : (
                  <Icon className={classes.expando}>expand_more</Icon>
                )}
              </Box>
            </Typography>
            <Box className={classes.expandoContainer}></Box>
          </Box>
        </CardActionArea>
        {renderExpanded()}
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
