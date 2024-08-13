import './App.css';
import React, { useState } from 'react';
import LocationInput from './components/LocationInput';
import BirdList from './components/BirdList';
import axios from 'axios';
import logo from './assets/birdlistlogo.png';

function App() {
  const [birds, setBirds] = useState([]);

  const handleLocationSubmit = async (location) => {
    try {
      const response = await axios.get(`https://api.ebird.org/v2/data/obs/${location}/recent`, {
        headers: {
          'X-eBirdApiToken': process.env.REACT_APP_EBIRD_API_KEY
        }
      });
  
      // sort the bird data based on the howMany property (descending order)
      const sortedBirds = response.data.sort((a, b) => {
        return (b.howMany || 0) - (a.howMany || 0);
      });
  
      setBirds(sortedBirds);
    } catch (error) {
      console.error("Error fetching bird data:", error);
    }
  };

  return (
    <div className="App">
      <img src={logo} alt="Bird List Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <h1>Bird List Generator</h1>
      <h3>
        This app generates a list of observed birds 
        (from most observed to least observed)
        based on your general location.
      </h3>
      <p>
        Enter a region code (for example: US-NY) 
        consisting of the country (US) and a subnational 
        code if necessary (NY). 
      </p>
      <p>
        Need help finding the region code?<br />
        <a href="/region_codes.xlsx" download>
          Download this list of regional and subregional codes
        </a>.
      </p>
      <p>
        <i>Utilizes eBird API</i>
      </p>
      <LocationInput onLocationSubmit={handleLocationSubmit} />
      <BirdList birds={birds} />
    </div>
  );
}

export default App;