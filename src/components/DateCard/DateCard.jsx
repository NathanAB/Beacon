import React from 'react';
import PropTypes from 'prop-types';
import { uniq, uniqBy, map } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import { Icon } from '@material-ui/core';

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
    'max-width': 'calc(100% - 32px)',
    padding: '0.5rem 1rem',
  },
  cardHeader: {
    'text-transform': 'uppercase',
    'font-weight': 400,
  },
  cardSubheader: {
    'font-weight': 300,
  },
  cardDescription: {
    position: 'relative',
    marginTop: '0.5rem',
  },
  cardDescriptionCollapsed: {
    height: '0px',
    overflow: 'hidden',
  },
  cardDescriptionFade: {
    height: '2em',
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    background: 'linear-gradient( 0deg, #7f194c, #ff000000 )',
  },
  cardDescriptionExpandIcon: {
    'font-size': '40px',
    display: 'block',
    margin: 'auto',
    color: 'white',
  },
  activitySection: {
    'margin-bottom': '15px',
  },
  activityTitle: {
    'padding-top': '1rem',
  },
  addButton: {
    position: 'absolute',
    right: -theme.spacing.unit * 2,
    bottom: -theme.spacing.unit * 2,
  },
  planDateButton: {
    display: 'block',
    margin: 'auto',
    'margin-top': '1em',
    'text-transform': 'uppercase',
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
    'margin-right': theme.spacing.unit,
    'margin-top': '5px',
    height: '1.5rem',
  },
  listChip: {
    'font-size': '1rem',
    'margin-right': theme.spacing.unit,
    'margin-bottom': theme.spacing.unit,
  },
  spotDetails: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
  },
  sectionImage: {
    display: 'block',
    width: '100%',
    height: '11rem',
    'background-position': 'center',
    'background-size': 'cover',
  },
  expandedContent: {
    padding: 0,
  },
});

function costToString(cost) {
  const str = [];
  for (let i = 0; i < cost; i += 1) {
    str.push('$');
  }
  return str.join('');
}

class DateCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };
    this.onClickAddHandler = this.onClickAddHandler.bind(this);
    this.onClickMainHandler = this.onClickMainHandler.bind(this);
  }

  onClickAddHandler() {
    const { onClickAdd, dateObj } = this.props;
    onClickAdd(dateObj);
  }

  onClickMainHandler() {
    const { onClickMain, noExpand } = this.props;
    if (noExpand) {
      return;
    }
    this.setState(oldState => ({
      isExpanded: !oldState.isExpanded,
    }));
    onClickMain();
  }

  renderAllTags() {
    const { dateObj, classes } = this.props;
    let tags = [];
    dateObj.sections.forEach(section => {
      tags.push(...section.tags);
    });
    tags = uniqBy(tags, tag => tag.name);
    tags = tags.slice(0, 3);

    return tags.map(tag => <Chip label={tag.name} className={classes.tagChip} />);
  }

  renderThumbnails() {
    const { dateObj, classes } = this.props;
    // eslint-disable-next-line arrow-body-style
    const thumbnails = dateObj.sections.map(section => {
      return (
        <div
          className={classes.thumbnailImage}
          style={{ backgroundImage: `url(${section.image})` }}
        />
      );
    });
    return <div className={classes.thumbnailContainer}>{thumbnails}</div>;
  }

  renderMain() {
    const { classes, dateObj } = this.props;
    const { sections } = dateObj;
    const { isExpanded } = this.state;

    const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
    const dateHours = Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
    const dateCost =
      sections.reduce((total, section) => total + section.price, 0) / sections.length;
    const dateCostString = costToString(dateCost);
    const dateLocations = uniq(map(sections, 'spot.neighborhood.name')).join(', ');
    const cardDescriptionClasses = [classes.cardDescription];
    if (!isExpanded) {
      cardDescriptionClasses.push(classes.cardDescriptionCollapsed);
    }
    return (
      <CardActionArea onClick={this.onClickMainHandler} className={classes.actionArea}>
        <CardMedia className={classes.media}>{this.renderThumbnails()}</CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography variant="subheading" className={classes.cardHeader}>
            {dateObj.name}
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.cardSubheader}>
            {`${dateLocations} • ${dateHours} hrs • ${dateCostString}`}
          </Typography>
          {this.renderAllTags()}
          <Typography variant="body2" className={cardDescriptionClasses}>
            {dateObj.description}
            {!isExpanded && <div className={classes.cardDescriptionFade} />}
          </Typography>
          {this.renderExpanded()}
        </CardContent>
      </CardActionArea>
    );
  }

  renderExpanded() {
    const { dateObj, classes } = this.props;
    const { isExpanded } = this.state;

    const sectionList = dateObj.sections.map(section => {
      const duration = Math.round(section.minutes / 30) / 2; // Round to the nearest half-hour
      const costString = costToString(section.price);
      return (
        <div className={classes.activitySection}>
          <Typography variant="body2" className={classes.activityTitle}>
            <strong>
              {section.spot.name} • {costString}
              <br />
              {duration} hours
            </strong>
          </Typography>
          <Typography variant="body2">{section.description}</Typography>
        </div>
      );
    });
    return (
      <Collapse in={isExpanded}>
        <CardContent className={classes.expandedContent}>
          {sectionList}
          <Button
            variant="contained"
            aria-label="Add this spot"
            color="primary"
            size="large"
            className={classes.planDateButton}
            onClick={this.onClickAddHandler}
          >
            {"Let's do this"}
          </Button>
        </CardContent>
      </Collapse>
    );
  }

  render() {
    const { classes } = this.props;
    const { isExpanded } = this.state;

    const cardDescriptionClasses = [classes.cardDescription];
    if (!isExpanded) {
      cardDescriptionClasses.push(classes.cardDescriptionCollapsed);
    }

    return (
      <div className={classes.container}>
        <Card className={classes.card} elevation={3}>
          {this.renderMain()}
        </Card>
      </div>
    );
  }
}

DateCard.propTypes = {
  classes: PropTypes.object,
  dateObj: PropTypes.object.isRequired,
  onClickMain: PropTypes.func,
  onClickAdd: PropTypes.func.isRequired,
  noExpand: PropTypes.bool,
};

DateCard.defaultProps = {
  classes: {},
  onClickMain: () => {},
  noExpand: false,
};

export default withStyles(styles)(DateCard);
