import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles, Typography, Chip, Button, Box } from '@material-ui/core';
import ReactGA from 'react-ga';

import Store from '../../../store';
import TagsRow from '../TagsRow/TagsRow';
import { getIsDesktop } from '../../../utils';

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
  sectionTitle: {
    fontWeight: 600,
  },
  searchButton: {
    textAlign: 'right',
  },
});

function FilterPage({ classes }) {
  const store = Store.useStore();
  const costs = store.get('costs');
  const filters = store.get('filters');
  const durations = store.get('durations');
  const neighborhoods = store.get('neighborhoods');
  const isDesktop = getIsDesktop();

  function toggleFilter(type, value) {
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter On',
      label: value.toString(),
    });
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
          key={option}
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
        <Typography variant="h6" className={classes.sectionTitle}>
          Cost
        </Typography>
        {renderFilterSection(costs, 'cost')}
      </section>

      <section className={classes.filterSection}>
        <Typography variant="h6" className={classes.sectionTitle}>
          Duration
        </Typography>
        {renderFilterSection(durations, 'duration')}
      </section>

      <section className={classes.filterSection}>
        <Typography variant="h6" className={classes.sectionTitle}>
          Location
        </Typography>
        {renderFilterSection(neighborhoods.map(n => n.name), 'neighborhood')}
      </section>

      <section className={classes.filterSection}>
        <Typography variant="h6" className={classes.sectionTitle}>
          Characteristic
        </Typography>
        <TagsRow />
      </section>

      <Box display="flex" flexDirection="row-reverse">
        <Button
          variant="contained"
          color="primary"
          className={classes.searchButton}
          fullWidth={!isDesktop}
          onClick={() => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Close Filter Page',
            });
            store.set('isFilterPageOpen')(false);
            window.scrollTo(0, 0);
          }}
        >
          Search
        </Button>
      </Box>
    </div>
  );
}

FilterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterPage);
