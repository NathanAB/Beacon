import React from 'react';
import DateCard from '../DateCard';
import DateCardContainer from '../DateCardContainer';

import './Body.css';

const cards = [

];

function Body() {
  return (
    <main>
      <DateCardContainer>
        <DateCard />
        <DateCard />
        <DateCard />
        <DateCard />
        <DateCard />
        <DateCard />
        <DateCard />
      </DateCardContainer>
    </main>
  );
}

export default Body;