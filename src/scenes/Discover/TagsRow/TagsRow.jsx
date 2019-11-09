import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Chip } from '@material-ui/core';
import Store from '../../../store';

const styles = theme => ({
  tagChip: {
    margin: '14px 14px 0 0',
    padding: '14px 6px',
    fontFamily: 'Raleway',
    [theme.breakpoints.up('sm')]: {
      margin: '18px 18px 0 0',
      padding: '18px 10px',
      fontSize: '16px',
    },
  },
  tagChipDisabled: {
    opacity: '0.5',
  },
});

function TagsRow({ classes }) {
  const store = Store.useStore();
  const tags = store.get('tags');
  const filters = store.get('filters');

  function addTagFilter(tag) {
    filters.push({ type: 'tag', value: tag.name, categoryId: tag.categoryId });
    store.set('filters')(filters);
  }

  function renderTags() {
    return tags.map(tag => {
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
        <Chip
          key={tag.name}
          label={tag.name}
          className={chipClasses.join(' ')}
          disabled={isCategoryToggled}
          onClick={isCategoryToggled ? null : () => addTagFilter(tag, isTagToggled)}
        />
      );
    });
  }

  return <section>{renderTags()}</section>;
}

export default withStyles(styles)(TagsRow);
