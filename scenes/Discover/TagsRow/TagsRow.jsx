import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Chip, CircularProgress } from '@material-ui/core';
import ReactGA from 'react-ga';

import { useRouter } from 'next/router';
import Store from '../../../store';
import Constants from '../../../constants';

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
  },
});

function TagsRow({ classes, isDiscover }) {
  const router = useRouter();
  const store = Store.useStore();
  const tags = store.get('tags');
  const filters = store.get('filters');

  function addTagFilter(tag) {
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter On',
      label: tag.name,
    });
    filters.push({ type: 'tag', value: tag.name, categoryId: tag.categoryId });
    store.set('filters')(filters);
    if (isDiscover) {
      router.push(Constants.PAGES.SEARCH).then(() => window.scrollTo(0, 0));
      ReactGA.event({
        category: 'Interaction',
        action: 'Focus Tag',
        label: tag.name,
      });
    }
  }

  function renderTags() {
    return tags.length ? (
      tags.map(tag => {
        const isTagToggled = filters.some(filter => filter.value === tag.name);
        if (isTagToggled) {
          return '';
        }

        // If a tag in this category has already been picked then grey it out
        const toggledCategories = filters.length
          ? filters.reduce((cats, curr) => {
              return { ...cats, [curr.categoryId]: true };
            }, {})
          : [];
        const isCategoryToggled = !!toggledCategories[tag.categoryId];
        const chipClasses = [classes.tagChip];
        if (isCategoryToggled) {
          chipClasses.push(classes.tagChipDisabled);
        }

        return (
          <span key={tag.name}>
            <Chip
              label={tag.name}
              className={chipClasses.join(' ')}
              disabled={isCategoryToggled}
              onClick={isCategoryToggled ? null : () => addTagFilter(tag, isTagToggled)}
            />
          </span>
        );
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
