import React from 'react';
import { uniq, uniqBy, map } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';

import { costToString } from '../../utils';

const styles = theme => ({
  tagChip: {
    marginRight: theme.spacing(1),
    marginTop: '5px',
    height: '1.5rem',
  },
});

const DateTags = ({ dateObj, classes, maxTags, paddingBottom, variant, color, tagsOnly }) => {
  const { sections } = dateObj;
  const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
  const dateHours = Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
  const dateCost = sections.reduce((total, section) => total + section.cost, 0) / sections.length;
  const dateCostString = costToString(dateCost);
  const dateLocations = uniq(map(sections, 'spot.neighborhood.name'));
  let tags = [];

  dateObj.sections.forEach(section => {
    tags.push(...section.tags);
  });

  tags = uniqBy(tags, tag => tag.name);

  if (maxTags >= 0) {
    tags = tags.slice(0, maxTags);
  }

  return (
    <Box paddingBottom={paddingBottom}>
      {tagsOnly || (
        <Box paddingBottom="5px">
          <Chip
            variant={variant}
            color={color}
            label={dateLocations[0]}
            className={classes.tagChip}
          ></Chip>
          <Chip
            variant={variant}
            color={color}
            label={`${dateHours} hrs`}
            className={classes.tagChip}
          ></Chip>
          <Chip
            color={color}
            variant={variant}
            label={dateCostString}
            className={classes.tagChip}
          ></Chip>
        </Box>
      )}
      {tags.map(tag => (
        <Chip key={tag.name} label={tag.name} className={classes.tagChip} />
      ))}
    </Box>
  );
};

export default withStyles(styles)(DateTags);
