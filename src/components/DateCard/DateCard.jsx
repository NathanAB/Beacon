import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  card: {
    width: '350px',
    'max-width': '100%',
    position: 'relative',
    overflow: 'visible',
    margin: 'auto',
  },
  cardContent: {
    backgroundColor: theme.palette.primary.main,
    width: '318px',
    'max-width': 'calc(100% - 32px)',
    color: 'white',
  },
  cardHeader: {
    color: theme.palette.primary.contrastText,
  },
  cardSubheader: {
    color: theme.palette.primary.contrastText,
  },
  cardDescription: {
    color: theme.palette.primary.contrastText,
  },
  cardDescriptionCollapsed: {
    height: '190px',
    overflow: 'hidden',
    'margin-bottom': '20px',
  },
  cardDescriptionFade: {
    height: '2em',
    position: 'absolute',
    bottom: '30px',
    width: '90%',
    background: 'linear-gradient( 0deg, #7f194c, #ff000000 )',
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
  },
  actionArea: {
    width: '100%',
  },
  media: {
    height: 140,
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
    'margin-bottom': theme.spacing.unit,
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
  stars: {

  },
});

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
    const { onClickMain } = this.props;
    this.setState(oldState => ({
      isExpanded: !oldState.isExpanded,
    }));
    onClickMain();
  }

  renderThumbnails() {
    const { dateObj, classes } = this.props;
    // eslint-disable-next-line arrow-body-style
    const thumbnails = dateObj.spots.map((spot) => {
      return (<img className={classes.thumbnailImage} alt={spot.name} style={{ backgroundImage: `url(${spot.imageUrl})` }} />);
    });
    return (
      <div className={classes.thumbnailContainer}>
        { thumbnails }
      </div>
    );
  }

  renderExpanded() {
    const { dateObj, classes } = this.props;
    const { isExpanded } = this.state;

    const spotList = dateObj.spots.map((spot, idx) => {
      const stars = [];
      for (let i = 1; i <= 5; i += 1) {
        const star = i <= spot.rating
          ? <Icon color="primary">star</Icon>
          : <Icon color="primary">star_border</Icon>;
        stars.push(star);
      }
      return (
        <div>
          <p>
            <h3>
              <Chip color="primary" label={idx + 1} className={classes.listChip} />
              { spot.activity }
            </h3>
            { spot.tags.map(tag => (<Chip variant="outlined" label={tag} className={classes.tagChip} />)) }
            <p>{spot.description}</p>
            <div className={classes.spotDetails}>
              <div className={classes.stars}>
                {stars}
              </div>
              <Button
                variant="contained"
                aria-label="Add this spot"
                color="secondary"
              >
                Add This Spot
              </Button>
            </div>
          </p>
          <Divider variant="middle" />
        </div>
      );
    });
    return (
      <Collapse in={isExpanded}>
        <CardContent>
          {spotList}
          <Button
            variant="contained"
            aria-label="Add this spot"
            color="primary"
            size="large"
            className={classes.planDateButton}
          >
            Plan Entire Date
          </Button>
        </CardContent>
      </Collapse>
    );
  }

  render() {
    const {
      classes,
      dateObj,
    } = this.props;
    const { isExpanded } = this.state;

    const cardDescriptionClasses = [classes.cardDescription];
    if (!isExpanded) {
      cardDescriptionClasses.push(classes.cardDescriptionCollapsed);
    }

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardActionArea onClick={this.onClickMainHandler} className={classes.actionArea}>
            <CardMedia
              className={classes.media}
            >
              { this.renderThumbnails() }
            </CardMedia>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" gutterBottom className={classes.cardHeader}>
                {dateObj.name}
              </Typography>
              <Typography variant="h6" gutterBottom className={classes.cardSubheader}>
                {`${dateObj.location} | ${dateObj.length} | ${dateObj.cost}`}
              </Typography>
              <Typography variant="body1" className={cardDescriptionClasses}>
                { dateObj.description }
                { !isExpanded
                  && <div className={classes.cardDescriptionFade} />
                }
              </Typography>
            </CardContent>
          </CardActionArea>
          { this.renderExpanded() }
          { !isExpanded
            && (
            <Fab
              variant="extended"
              aria-label="Plan Date"
              color="secondary"
              className={classes.addButton}
              onClick={this.onClickAddHandler}
            >
              Plan This
            </Fab>
            )
          }
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
};

DateCard.defaultProps = {
  classes: {},
  onClickMain: () => {},
};

export default withStyles(styles)(DateCard);
