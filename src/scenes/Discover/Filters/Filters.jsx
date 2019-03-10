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
  Chip,
} from '@material-ui/core';

import Tags from '../../../mocks/tags';
import Locations from '../../../mocks/locations';

const styles = {
  filtersContainer: {
    margin: '20px 32px',
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
  filterChip: {
    margin: '0.3em',
    'border-width': '1px',
    'border-style': 'solid',
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
        {
          Tags.map((tag) => {
            const isFilterOn = tagFilters.indexOf(tag) !== -1;
            const variant = isFilterOn ? '' : 'outlined';
            const color = isFilterOn ? 'primary' : '';
            return (
              <Chip
                className={classes.filterChip}
                key={tag}
                onClick={toggleTag(tag)}
                label={tag}
                variant={variant}
                color={color}
              />
            );
          })
        }
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
