import React from 'react';

function BirdList({ birds }) {
  return (
    <ul>
      {birds.map((bird, index) => (
        <li key={index}>
          {bird.comName} ({bird.sciName}) - {bird.howMany ? `${bird.howMany} observed` : 'No count provided'}
        </li>
      ))}
    </ul>
  );
}

export default BirdList;