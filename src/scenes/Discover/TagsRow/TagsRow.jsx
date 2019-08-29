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
  const filters = store.get('filters');

  function addTagFilter(tag) {
    filters.push({ type: 'tag', value: tag.name });
    store.set('filters')(filters);
  }

  function renderTags() {
    return tags.map(tag => {
      const isTagToggled = filters.some(filter => filter.value === tag.name);
      if (isTagToggled) {
        return '';
      }
      const color = isTagToggled ? 'primary' : 'default';
      return (
        <Chip
          key={tag.name}
          color={color}
          label={tag.name}
          className={classes.tagChip}
          onClick={() => addTagFilter(tag, isTagToggled)}
        />
      );
    });
  }

  return <section>{renderTags()}</section>;
}

export default withStyles(styles)(TagsRow);
