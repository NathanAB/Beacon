import React from 'react';
import { PropTypes } from 'prop-types';
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  List,
  Checkbox,
  ListItemText,
  ListItem,
  Icon,
  Divider,
} from '@material-ui/core';

import Tags from '../../../mocks/tags';
import Locations from '../../../mocks/locations';

const styles = {
  filtersContainer: {
    margin: '20px 0px',
  },
  filtersButton: {
    margin: 'auto',
  },
  filtersText: {
    'vertical-align': 'middle',
  },
  filtersBody: {
    display: 'block',
  },
  checkbox: {
    padding: '0px',
  },
  divider: {
    margin: '10px 0',
  },
};

function Filters({
  classes,
  toggleTag,
  tagFilters,
  toggleLocation,
  locationFilters,
}) {
  return (
    <ExpansionPanel color="primary" className={classes.filtersContainer}>
      <ExpansionPanelSummary className={classes.filtersButtonContainer}>
        <Typography variant="button" color="primary" align="center" className={classes.filtersButton}>
          <span className={classes.filtersText}>Filters</span>
          {' '}
          <Icon color="primary" className={classes.filtersText}>filter_list</Icon>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.filtersBody}>
        <Typography variant="overline">Locations:</Typography>
        <List className={classes.root}>
          {
          Locations.map(location => (
            <ListItem
              key={location}
              role={undefined}
              dense
              button
              onClick={toggleLocation(location)}
              className={classes.checkbox}
            >
              <Checkbox
                checked={locationFilters.indexOf(location) !== -1}
                checkedIcon={<Icon>check_box</Icon>}
                disableRipple
                color="primary"
              />
              <ListItemText primary={location} />
            </ListItem>
          ))
        }
        </List>
        <Divider variant="middle" className={classes.divider} />
        <Typography variant="overline">Tags:</Typography>
        <List className={classes.root}>
          {
          Tags.map(tag => (
            <ListItem
              key={tag}
              role={undefined}
              dense
              button
              onClick={toggleTag(tag)}
              className={classes.checkbox}
            >
              <Checkbox
                checked={tagFilters.indexOf(tag) !== -1}
                checkedIcon={<Icon>check_box</Icon>}
                disableRipple
                color="primary"
              />
              <ListItemText primary={tag} />
            </ListItem>
          ))
        }
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleTag: PropTypes.func.isRequired,
  tagFilters: PropTypes.array.isRequired,
  toggleLocation: PropTypes.func.isRequired,
  locationFilters: PropTypes.array.isRequired,
};

export default withStyles(styles)(Filters);
