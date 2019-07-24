import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles, Typography, Icon, Chip } from '@material-ui/core';

import Store from '../../../store';

const styles = {
  search: {
    position: 'relative',
    borderRadius: '12px',
    border: '1px solid gray',
    width: '100%',
    padding: '0.2rem 0',
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

function Filters({ classes }) {
  const store = Store.useStore();
  const filters = store.get('filters');

  const removeFilter = filterToRemove => () => {
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
  );
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filters);
