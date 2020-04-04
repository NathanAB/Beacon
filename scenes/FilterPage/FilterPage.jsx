import React from 'react';
import { withStyles, Typography, Chip, Button, Box } from '@material-ui/core';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';

import Store from '../../store';
import TagsRow from '../../components/TagsRow/TagsRow';
import FilterBar from '../FilterBar/FilterBar';
import { useDesktop, useFilters } from '../../utils';

const styles = theme => ({
  container: {
    padding: '0px 20px',
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
  search: {
    position: 'relative',
    borderRadius: '2rem',
    border: '1px solid gray',
    marginLeft: 0,
    width: '100%',
    'margin-bottom': '1rem',
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
  const durations = store.get('durations');
  const neighborhoods = store.get('neighborhoods');
  const isDesktop = useDesktop();
  const [filters, setFilters] = useFilters();

  function toggleFilter(type, value) {
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter On',
      label: value.toString(),
    });
    const newFilters = filters.concat({ type, value });
    setFilters(newFilters);
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
    <>
      <FilterBar />
      <Box className={classes.container}>
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
            Neighborhood
          </Typography>
          {renderFilterSection(
            neighborhoods.map(n => n.name),
            'neighborhood',
          )}
        </section>

        <section className={classes.filterSection}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Characteristic
          </Typography>
          <TagsRow />
        </section>

        <Box display="flex" flexDirection="row-reverse">
          <InternalLink href={{ pathname: '/search', query: { filters: JSON.stringify(filters) } }}>
            <a>
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
                }}
              >
                Search
              </Button>
            </a>
          </InternalLink>
        </Box>
      </Box>
    </>
  );
}

export default withStyles(styles)(FilterPage);
