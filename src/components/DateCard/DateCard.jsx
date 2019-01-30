import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
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
  },
  card: {
    width: '350px',
    position: 'relative',
  },
  cardContent: {
    backgroundColor: theme.palette.primary.main,
    width: '350px',
    color: 'white',
  },
  cardHeader: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.4rem',
  },
  cardSubheader: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.1rem',
    fontWeight: '300',
  },
  addButton: {
    position: 'absolute',
    right: -theme.spacing.unit * 2,
    bottom: -theme.spacing.unit * 2,
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
      return (<img className={classes.thumbnailImage} alt={spot.name} style={{ 'background-image': `url(${spot.imageUrl})` }} />);
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
          <p style={{ 'text-align': 'center' }}>
            <Button
              variant="contained"
              aria-label="Add this spot"
              color="primary"
              size="large"
            >
              Plan Entire Date
            </Button>
          </p>
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
              <Typography gutterBottom variant="headline" component="h2" className={classes.cardHeader}>
                {dateObj.name}
              </Typography>
              <Typography component="p" className={classes.cardSubheader}>
                {`${dateObj.location} | ${dateObj.length}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          { this.renderExpanded() }
        </Card>
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
