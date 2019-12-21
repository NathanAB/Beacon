import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles, Box, Typography, Icon, Chip } from '@material-ui/core';
import ReactGA from 'react-ga';

import Store from '../../../store';

const styles = {
  container: {
    padding: '0px 20px',
  },
  search: {
    position: 'relative',
    borderRadius: '12px',
    border: '1px solid lightgray',
    width: '100%',
    padding: '8px 0',
    textAlign: 'left',
    outline: 'none',
    color: 'gray',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '47px',
  },
  searchIcon: {
    'margin-left': '1rem',
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
  chip: {
    margin: '0.2rem',
  },
  placeholder: {
    color: 'gray',
    display: 'inline-block',
  },
};

function FilterBar({ classes }) {
  const store = Store.useStore();
  const filters = store.get('filters');

  const removeFilter = filterToRemove => () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter Off',
      label: filterToRemove.value,
    });
    const newFilters = filters.filter(filter => filter.value !== filterToRemove.value);
    store.set('filters')(newFilters);
  };

  function renderChips() {
    if (filters.length) {
      return filters.map(filter => {
        return (
          <Chip
            key={filter.value}
            label={filter.value}
            className={classes.chip}
            onDelete={removeFilter(filter)}
          />
        );
      });
    }
    return (
      <Typography variant="subtitle1" className={classes.placeholder}>
        Have a specific thing in mind?
      </Typography>
    );
  }

  return (
    <Box className={classes.container}>
      <button
        type="button"
        className={classes.search}
        onClick={() => {
          ReactGA.event({
            category: 'Interaction',
            action: 'Open Filter Page',
          });
          store.set('isFilterPageOpen')(true);
        }}
      >
        <span className={classes.searchIcon}>
          <Icon>filter_list</Icon>
        </span>
        <span className={classes.filterChips}>{renderChips()}</span>
      </button>
    </Box>
  );
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterBar);
