import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Typography,
} from '@material-ui/core';

import Filters from './Filters/Filters';
import DateCardContainer from './DateCardContainer/DateCardContainer';
import DateObjs from '../../mocks/dates';
import DateCard from '../../components/DateCard/DateCard';

function Discover({ onAddDate }) {
  const [tagFilters, setTagFilters] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);
  const dateComponents = DateObjs
    .filter((date) => {
      if (!tagFilters.length) {
        return true;
      }

      return date.spots.find(spot => (
        spot.tags.find(tag => tagFilters.indexOf(tag) > -1)
      ));
    })
    .map(date => (<DateCard onClickAdd={onAddDate} dateObj={date} />));

  const toggleTag = value => () => {
    const currentIndex = tagFilters.indexOf(value);
    const newTagFilters = [...tagFilters];

    if (currentIndex === -1) {
      newTagFilters.push(value);
    } else {
      newTagFilters.splice(currentIndex, 1);
    }

    setTagFilters(newTagFilters);
  };

  const toggleLocation = value => () => {
    const currentIndex = locationFilters.indexOf(value);
    const newLocationFilters = [...locationFilters];

    if (currentIndex === -1) {
      newLocationFilters.push(value);
    } else {
      newLocationFilters.splice(currentIndex, 1);
    }

    setLocationFilters(newLocationFilters);
  };

  return (
    <React.Fragment>
      <Filters
        toggleTag={toggleTag}
        tagFilters={tagFilters}
        toggleLocation={toggleLocation}
        locationFilters={locationFilters}
      />
      { dateComponents.length
        ? <DateCardContainer tagFilters={tagFilters}>{ dateComponents }</DateCardContainer>
        : <Typography variant="h6" align="center">No date plans meet your criteria :(</Typography>
      }
    </React.Fragment>
  );
}

Discover.propTypes = {
  onAddDate: PropTypes.func,
};

Discover.defaultProps = {
  onAddDate: () => {},
};

export default Discover;
