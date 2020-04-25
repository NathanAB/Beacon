import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Chip, CircularProgress } from '@material-ui/core';
import ReactGA from 'react-ga';

import Link from 'next/link';
import Store from '../../store';
import { useFilters, filterArrayToString, filterDates } from '../../utils';

const styles = theme => ({
  tagChip: {
    margin: '14px 14px 0 0',
    padding: '14px 6px',
    fontFamily: 'Raleway',
    [theme.breakpoints.up('sm')]: {
      margin: '18px 18px 0 0',
      padding: '18px 10px',
      fontSize: '15px',
    },
  },
  loadingContainer: {
    textAlign: 'center',
  },
  tagChipDisabled: {
    opacity: '0.5',
    pointerEvents: 'none',
    padding: '13px 5px',
    [theme.breakpoints.up('sm')]: {
      padding: '17px 9px',
    },
  },
});

function TagsRow({ classes, isDiscover }) {
  const store = Store.useStore();
  const tags = store.get('tags');
  const dates = store.get('dates');
  const [filters, setFilters] = useFilters();

  function addTagFilter(tag) {
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter On',
      label: tag.name,
    });
    filters.push({ type: 'tag', value: tag.name, categoryId: tag.categoryId });
    setFilters(filters);
  }

  function renderTags() {
    return tags.length ? (
      tags.map(tag => {
        const isTagToggled = filters.some(filter => filter.value === tag.name);
        if (isTagToggled) {
          return '';
        }

        const wouldCauseEmptySearch =
          filterDates(dates, [...filters, { type: 'tag', value: tag.name }]).length === 0;

        // If a tag in this category has already been picked then grey it out
        const toggledCategories = filters.length
          ? filters.reduce((cats, curr) => {
              return { ...cats, [curr.categoryId]: true };
            }, {})
          : [];
        const isCategoryToggled = !!toggledCategories[tag.categoryId];
        const chipClasses = [classes.tagChip];

        if (isCategoryToggled || wouldCauseEmptySearch) {
          chipClasses.push(classes.tagChipDisabled);
        }

        const chipContent = (
          <Chip
            label={tag.name}
            className={chipClasses.join(' ')}
            variant={wouldCauseEmptySearch || isCategoryToggled ? 'outlined' : 'default'}
            onClick={isCategoryToggled || isDiscover ? null : () => addTagFilter(tag, isTagToggled)}
          />
        );

        if (isDiscover) {
          const newFilters = [{ type: 'tag', value: tag.name, categoryId: tag.categoryId }];
          return (
            <span key={tag.name}>
              <Link
                href={{ pathname: 'search', query: { filters: filterArrayToString(newFilters) } }}
              >
                <a>{chipContent}</a>
              </Link>
            </span>
          );
        }
        return <span key={tag.name}>{chipContent}</span>;
      })
    ) : (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return <section>{renderTags()}</section>;
}

export default withStyles(styles)(TagsRow);
