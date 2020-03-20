import React from 'react';
import { uniq, uniqBy, map } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';

import { costToString } from '../../utils';

const styles = theme => ({
  tagChip: {
    marginRight: theme.spacing(1),
    marginTop: '8px',
    height: '1.5rem',
  },
});

const DateTags = ({
  dateObj,
  sectionObj,
  classes,
  maxTags,
  paddingBottom,
  variant,
  color,
  tagsOnly,
  singleRow,
  align,
}) => {
  let tags = [];
  let dateHours;
  let dateCostString;
  let dateLocations = [];

  if (dateObj) {
    const { sections } = dateObj;
    const dateMinutes = sections.reduce((total, section) => total + section.minutes, 0);
    dateHours = Math.round(dateMinutes / 30) / 2; // Round to the nearest half-hour
    const dateCost = sections.reduce((total, section) => total + section.cost, 0) / sections.length;
    dateCostString = costToString(dateCost);
    dateLocations = uniq(map(sections, 'spot.neighborhood.name'));
    dateObj.sections.forEach(section => {
      tags.push(...section.tags);
    });
  } else if (sectionObj) {
    dateHours = Math.round(sectionObj.minutes / 30) / 2; // Round to the nearest half-hour
    dateCostString = costToString(sectionObj.cost);
    dateLocations.push(sectionObj.spot.neighborhood.name);
    tags.push(...sectionObj.tags);
  }

  tags = uniqBy(tags, tag => tag.name);

  if (maxTags >= 0) {
    tags = tags.slice(0, maxTags);
  }

  const renderMetaChips = () => (
    <>
      <Chip variant={variant} color={color} label={dateLocations[0]} className={classes.tagChip} />
      <Chip
        variant={variant}
        color={color}
        label={`${dateHours} hrs`}
        className={classes.tagChip}
      />
      <Chip color={color} variant={variant} label={dateCostString} className={classes.tagChip} />
    </>
  );

  return (
    <Box paddingBottom={paddingBottom} textAlign={align}>
      {singleRow && !tagsOnly && renderMetaChips()}
      {!singleRow && !tagsOnly && (
        <Box paddingBottom="5px" display="flex">
          {renderMetaChips()}
        </Box>
      )}
      {tags.map(tag => (
        <Chip key={tag.name} label={tag.name} className={classes.tagChip} />
      ))}
    </Box>
  );
};

export default withStyles(styles)(DateTags);
