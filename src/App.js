import './App.css';
import React, { useEffect, useState } from 'react';
import LocationInput from './components/LocationInput';
import BirdList from './components/BirdList';
import axios from 'axios';
import Papa from 'papaparse';
import logo from './assets/birdlistlogo.png';

function App() {
  const [birds, setBirds] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sub1, setSub1] = useState([]);
  const [sub2, setSub2] = useState([]);

  useEffect(() => {
    const loadCSV = async (path, setter) => {
      const res = await fetch(path);
      const text = await res.text();
      Papa.parse(text, {
        header: true,
        complete: (result) => setter(result.data)
      });
    };

    loadCSV('/data/countries.csv', setCountries);
    loadCSV('/data/sub1.csv', setSub1);
    loadCSV('/data/sub2.csv', setSub2);
  }, []);

  // clear the bird list
  const clearAll = () => {
    setBirds([]);
  };

  const handleLocationSubmit = async (locationCode) => {
    try {
      const response = await axios.get(
        `https://api.ebird.org/v2/data/obs/${locationCode}/recent`,
        {
          headers: {
            'X-eBirdApiToken': process.env.REACT_APP_EBIRD_API_KEY
          }
        }
      );

      const sortedBirds = response.data.sort(
        (a, b) => (b.howMany || 0) - (a.howMany || 0)
      );

      setBirds(sortedBirds);
    } catch (error) {
      console.error("Error fetching bird data:", error);
    }
  };

  return (
    <div className="App">
      <img src={logo} alt="Bird List Logo" style={{ width: '150px' }} />
      <h1>Bird List Generator</h1>
      <p className="app-subtitle">
        Generate real-time bird sighting lists for any country, state, or region using the eBird API.
      </p>

      <LocationInput
        countries={countries}
        sub1={sub1}
        sub2={sub2}
        onLocationSubmit={handleLocationSubmit}
        onClear={clearAll}
      />

      <BirdList birds={birds} />
    </div>
  );
}

export default App;
