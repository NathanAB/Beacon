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
  InputBase,
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
  search: {
    position: 'relative',
    borderRadius: '2rem',
    border: '1px solid gray',
    marginLeft: 0,
    width: '100%',
    'margin-bottom': '1rem',
  },
  searchIcon: {
    width: '1rem',
    'margin-left': '1rem',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: '0.7rem',
    'padding-left': '2.3rem',
    width: '100%',
  },
};

function Filters({
  classes,
  toggleTag,
  tagFilters,
  toggleLocationFilter,
  locationFilters,
  toggleCostFilter,
  costFilters,
}) {
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Icon>search</Icon>
      </div>
      <InputBase
        placeholder="Have a specific thing in mind?"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
    /** 
    <ExpansionPanel color="primary" className={classes.filtersContainer}>
      <ExpansionPanelSummary className={classes.filtersButtonContainer}>
        <Typography
          variant="button"
          color="primary"
          align="center"
          className={classes.filtersButton}
        >
          <span className={classes.filtersText}>Filters</span>{' '}
          <Icon color="primary" className={classes.filtersText}>
            filter_list
          </Icon>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.filtersBody}>
        <Typography variant="overline">Locations:</Typography>
        <List className={classes.root}>
          {Locations.map(location => (
            <ListItem
              key={location}
              role={undefined}
              dense
              button
              onClick={toggleLocationFilter(location)}
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
          ))}
        </List>
        <Divider variant="middle" className={classes.divider} />
        <Typography variant="overline">Cost:</Typography>
        <List className={classes.root}>
          {['$', '$$', '$$$', '$$$$'].map(cost => (
            <ListItem
              key={cost}
              role={undefined}
              dense
              button
              onClick={toggleCostFilter(cost)}
              className={classes.checkbox}
            >
              <Checkbox
                checked={costFilters.indexOf(cost) !== -1}
                checkedIcon={<Icon>check_box</Icon>}
                disableRipple
                color="primary"
              />
              <ListItemText primary={cost} />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" className={classes.divider} />
        <Typography variant="overline">Tags:</Typography>
        {Tags.map(tag => {
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
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
    * */
  );
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleTag: PropTypes.func.isRequired,
  tagFilters: PropTypes.array.isRequired,
  toggleLocationFilter: PropTypes.func.isRequired,
  locationFilters: PropTypes.array.isRequired,
  toggleCostFilter: PropTypes.func.isRequired,
  costFilters: PropTypes.array.isRequired,
};

export default withStyles(styles)(Filters);
