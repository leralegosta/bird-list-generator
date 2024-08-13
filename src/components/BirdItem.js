import React from 'react';

function BirdItem({ bird }) {
  return (
    <li>
      <h2>{bird.name}</h2>
      <img alt={bird.name} />
      <p>{bird.description}</p>
    </li>
  );
}

export default BirdItem;