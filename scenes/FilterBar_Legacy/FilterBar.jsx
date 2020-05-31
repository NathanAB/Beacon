import React from 'react';
import { withStyles, Box, Typography, Icon, Chip } from '@material-ui/core';
import ReactGA from 'react-ga';
import InternalLink from 'next/link';
import { useRouter } from 'next/router';

import { useFilters } from '../../utils';

const styles = {
  container: {
    padding: '10px 20px',
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
    minHeight: '56px',
    backgroundColor: 'white',
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

function FilterBar({ classes, isStatic }) {
  const [filters, setFilters] = useFilters();
  const router = useRouter();

  const removeFilter = filterToRemove => e => {
    e.stopPropagation();
    e.preventDefault();
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter Off',
      label: filterToRemove.value,
    });
    const newFilters = filters.filter(filter => filter.value !== filterToRemove.value);
    setFilters(newFilters);
  };

  function renderChips() {
    if (filters.length && !isStatic) {
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
        <b>Filter dates by</b> <i>cost, activity, vibe...</i>
      </Typography>
    );
  }

  const onClick = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Open Filter Page',
    });
  };

  return (
    <Box className={classes.container}>
      <InternalLink href={{ pathname: '/filters', query: router.query }}>
        <a
          className={classes.search}
          onClick={onClick}
          onKeyDown={e => {
            if (e.keyCode === 13) onClick();
          }}
        >
          <span className={classes.searchIcon}>
            <Icon>filter_list</Icon>
          </span>
          <span className={classes.filterChips}>{renderChips()}</span>
        </a>
      </InternalLink>
    </Box>
  );
}

export default withStyles(styles)(FilterBar);
