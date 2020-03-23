import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Constants from '../../../../constants';

const DateMap = ({ placeIds }) => {
  if (!placeIds || placeIds.length < 2 || !placeIds[0] || !placeIds[0]) {
    return (
      <Box
        display="flex"
        alignItems="center"
        padding="20px"
        width="100%"
        height="100%"
        justifyContent="space-around"
        flexDirection="column"
      >
        <Typography align="center" variant="h6">
          <span role="img" aria-label="House emoji" style={{ fontSize: '42px' }}>
            🏠
          </span>{' '}
          <br />
          No map needed - enjoy this date at home!
        </Typography>
      </Box>
    );
  }

  let mapSrc = 'https://www.google.com/maps/embed/v1/directions?';
  mapSrc += `origin=place_id:${placeIds[0]}&`;
  mapSrc += `destination=place_id:${placeIds[1]}&`;
  mapSrc += 'mode=walking&';
  mapSrc += 'zoom=14&';
  mapSrc += `key=${Constants.KEYS.MAPS_API_KEY}`;
  return (
    <iframe
      title="Date Directions"
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0, minHeight: '300px' }}
      src={mapSrc}
      allowFullScreen
    ></iframe>
  );
};

export default DateMap;
