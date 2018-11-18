import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    fontSize: '1.8em',
  },
  cardSubheader: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.2em',
    fontWeight: '100',
  },
  addButton: {
    position: 'absolute',
    right: -theme.spacing.unit * 2,
    bottom: -theme.spacing.unit * 2,
  },
  media: {
    height: 140,
  },
});

function DateCard(props) {
  const {
    classes,
    onClickMain,
    onClickAdd,
  } = props;
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardActionArea onClick={onClickMain}>
          <CardMedia
            className={classes.media}
            image="https://tclf.org/sites/default/files/thumbnails/image/MeridianHillPark_feature_CharlesBirnbaum_2013-02.jpg"
            title="Neighborhood Walk"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="headline" component="h2" className={classes.cardHeader}>
            Neighborhood Walk
            </Typography>
            <Typography component="p" className={classes.cardSubheader}>
            Georgetown | 3 Hours
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <AddButton onClick={onClickAdd} /> */}
      </Card>
      <Button variant="fab" aria-label="Add" color="secondary" className={classes.addButton} onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
}

DateCard.propTypes = {
  classes: PropTypes.object,
  onClickMain: PropTypes.func,
  onClickAdd: PropTypes.func,
};

DateCard.defaultProps = {
  classes: {},
  onClickMain: () => {
    alert('clicked card!');
  },
  onClickAdd: () => {
    alert('clicked add!');
  },
};

export default withStyles(styles)(DateCard);
