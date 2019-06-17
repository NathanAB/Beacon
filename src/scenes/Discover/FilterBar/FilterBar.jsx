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
import Store from '../../../store';

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
    width: '100%',
    padding: '0.3rem 0',
    textAlign: 'left',
    outline: 'none',
    color: 'gray',
    marginBottom: '1rem',
  },
  searchIcon: {
    'margin-left': '0.8rem',
    width: '1rem',
    height: '100%',
    pointerEvents: 'none',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray',
    'vertical-align': 'middle',
  },
  filterChips: {
    'margin-left': '1rem',
    'vertical-align': 'middle',
    display: 'inline-block',
  },
  placeholder: {
    color: 'gray',
    display: 'inline-block',
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
  const store = Store.useStore();
  const filters = store.get('filters');

  function renderChips() {
    if (filters.length) {
      return filters.map(filter => {
        return <Chip label={filter.value} />;
      });
    }
    return (
      <Typography variant="body2" className={classes.placeholder}>
        Have a specific thing in mind?
      </Typography>
    );
  }

  return (
    <button
      type="button"
      className={classes.search}
      onClick={() => store.set('isFilterPageOpen')(true)}
    >
      <span className={classes.searchIcon}>
        <Icon>filter_list</Icon>
      </span>
      <span className={classes.filterChips}>{renderChips()}</span>
    </button>
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
