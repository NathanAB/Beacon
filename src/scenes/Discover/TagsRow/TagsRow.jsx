import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import ReactGA from 'react-ga';
import Store from '../../../store';

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
  tagChipDisabled: {
    opacity: '0.5',
  },
});

function TagsRow({ classes, isDiscover }) {
  const store = Store.useStore();
  const tags = store.get('tags');
  const filters = store.get('filters');

  function addTagFilter(tag) {
    if (isDiscover) {
      ReactGA.event({
        category: 'Interaction',
        action: 'Focus Tag',
        label: tag.name,
      });
    }
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter On',
      label: tag.name,
    });
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

      const focusTag = () => {
        addTagFilter(tag, isTagToggled);
      };

      return (
        <Chip
          key={tag.name}
          label={tag.name}
          className={chipClasses.join(' ')}
          disabled={isCategoryToggled}
          onClick={isCategoryToggled ? null : focusTag}
        />
      );
    });
  }

  return <section>{renderTags()}</section>;
}

export default withStyles(styles)(TagsRow);
