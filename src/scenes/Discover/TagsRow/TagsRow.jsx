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
