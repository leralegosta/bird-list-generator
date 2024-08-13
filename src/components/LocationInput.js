import React, { useState } from 'react';

function LocationInput({ onLocationSubmit }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationSubmit(location);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Get Birds</button>
    </form>
  );
}

export default LocationInput;