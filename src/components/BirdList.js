import React from 'react';
import BirdItem from './BirdItem';

function BirdList({ birds }) {
  return (
    <ul>
      {birds.map((bird, index) => (
        <BirdItem key={index} bird={bird} />
      ))}
    </ul>
  );
}

export default BirdList;
