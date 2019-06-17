import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Chip } from '@material-ui/core';
import Store from '../../../store';

const styles = () => ({
  tagChip: {
    margin: '0.7rem 0.7rem 0 0',
  },
});

function TagsRow({ classes }) {
  const store = Store.useStore();
  const tags = store.get('tags');
  let filters = store.get('filters');

  function addTagFilter(tag, isTagToggled) {
    if (isTagToggled) {
      filters = filters.filter(filter => filter.value !== tag);
    } else {
      filters.push({ type: 'tag', value: tag });
    }
    store.set('filters')(filters);
  }

  function renderTags() {
    return tags.map(tag => {
      const isTagToggled = filters.some(filter => filter.value === tag);
      const color = isTagToggled ? 'primary' : 'default';
      return (
        <Chip
          color={color}
          label={tag}
          className={classes.tagChip}
          onClick={() => addTagFilter(tag, isTagToggled)}
        />
      );
    });
  }

  return <section>{renderTags()}</section>;
}

export default withStyles(styles)(TagsRow);
