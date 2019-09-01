import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles, Typography, Chip, Button } from '@material-ui/core';

import Store from '../../../store';
import TagsRow from '../TagsRow/TagsRow';

const styles = theme => ({
  filtersContainer: {
    margin: '20px 32px',
  },
  filtersButton: {
    margin: 'auto',
  },
  tagChip: {
    margin: '14px 14px 0 0',
    padding: '14px 6px',
    [theme.breakpoints.up('sm')]: {
      margin: '18px 18px 0 0',
      padding: '18px 10px',
      fontSize: '15px',
    },
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
  filterSection: {
    marginBottom: '25px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '35px',
    },
  },
});

function FilterPage({ classes }) {
  const store = Store.useStore();
  const costs = store.get('costs');
  const filters = store.get('filters');
  const durations = store.get('durations');
  const neighborhoods = store.get('neighborhoods');

  function toggleFilter(type, value) {
    const newFilters = filters.concat({ type, value });
    store.set('filters')(newFilters);
  }

  function renderFilterSection(options, type) {
    return options.map(option => {
      const isTagToggled = filters.some(filter => filter.value === option);
      if (isTagToggled) {
        return '';
      }
      const color = isTagToggled ? 'primary' : 'default';
      return (
        <Chip
          color={color}
          label={option}
          className={classes.tagChip}
          onClick={() => toggleFilter(type, option)}
        />
      );
    });
  }

  return (
    <div>
      <section className={classes.filterSection}>
        <Typography variant="h6">Cost</Typography>
        {renderFilterSection(costs, 'cost')}
      </section>

      <section className={classes.filterSection}>
        <Typography variant="h6">Duration</Typography>
        {renderFilterSection(durations, 'duration')}
      </section>

      <section className={classes.filterSection}>
        <Typography variant="h6">Location</Typography>
        {renderFilterSection(neighborhoods.map(n => n.name), 'neighborhood')}
      </section>

      <section className={classes.filterSection}>
        <Typography variant="h6">Characteristic</Typography>
        <TagsRow />
      </section>

      <Button
        variant="contained"
        color="primary"
        onClick={() => store.set('isFilterPageOpen')(false)}
      >
        Search
      </Button>
    </div>
  );
}

FilterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterPage);
