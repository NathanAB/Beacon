import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
  },
  listHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  noDate: {
    padding: '10px',
  },
});

function PinnedSubheaderList(props) {
  const { classes, currentDate } = props;

  return (
    <List className={classes.root} subheader={<li />}>
      <ListSubheader className={classes.listHeader}>YOUR DATE</ListSubheader>
      {currentDate.length
        ? currentDate.map(date => (
          <ListItem className={classes.listItem} key={date.name}>
            <ListItemText primary={date.name} />
          </ListItem>
        ))
        : (
          <div className={classes.noDate}>
            Nothing planned so far!
          </div>
        )
      }
    </List>
  );
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired,
  currentDate: PropTypes.array.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);
