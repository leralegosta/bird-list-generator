import React, { useState, useMemo } from 'react';

function LocationInput({ countries, sub1, sub2, onLocationSubmit, onClear }) {
  const [countryText, setCountryText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSub1, setSelectedSub1] = useState('');
  const [selectedSub2, setSelectedSub2] = useState('');

  // filter countries based on input text
  const filteredCountries = useMemo(() => {
    return countries.filter(c =>
      c.country_name?.toLowerCase().includes(countryText.toLowerCase())
    ).slice(0, 10);
  }, [countryText, countries]);

  // filter sub1 options based on selected country
  const sub1Options = sub1.filter(
    s => s.country_code === selectedCountry?.country_code
  );

  // filter sub2 options based on selected sub1
  const sub2Options = sub2.filter(
    s =>
      s.country_code === selectedCountry?.country_code &&
      s.subnational1_code === selectedSub1
  );

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let finalCode = selectedCountry?.country_code;
    if (selectedSub1) finalCode = selectedSub1;
    if (selectedSub2) finalCode = selectedSub2;

    onLocationSubmit(finalCode);
  };

  // clear all selected values and reset the form
  const handleClear = () => {
    setCountryText('');
    setSelectedCountry(null);
    setSelectedSub1('');
    setSelectedSub2('');
    onClear(); 
  };

  // render the form with input fields and options
  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Type a country..."
        value={countryText}
        onChange={(e) => {
          setCountryText(e.target.value);
          setSelectedCountry(null);
          setSelectedSub1('');
          setSelectedSub2('');
        }}
      />

      {countryText && !selectedCountry && (
        <div className="autocomplete">
          {filteredCountries.map((c) => (
            <div
              key={c.country_code}
              onClick={() => {
                setSelectedCountry(c);
                setCountryText(c.country_name);
              }}
            >
              {c.country_name}
            </div>
          ))}
        </div>
      )}

      {selectedCountry && (
        <select
          value={selectedSub1}
          onChange={(e) => {
            setSelectedSub1(e.target.value);
            setSelectedSub2('');
          }}
        >
          <option value="">All {selectedCountry.country_name}</option>
          {sub1Options.map((s) => (
            <option key={s.subnational1_code} value={s.subnational1_code}>
              {s.subnational1_name}
            </option>
          ))}
        </select>
      )}

      {selectedSub1 && (
        <select
          value={selectedSub2}
          onChange={(e) => setSelectedSub2(e.target.value)}
        >
          <option value="">All Region</option>
          {sub2Options.map((s) => (
            <option key={s.subnational2_code} value={s.subnational2_code}>
              {s.subnational2_name}
            </option>
          ))}
        </select>
      )}

      <div>
        <button type="submit">Get Birds</button>
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>
    </form>
  );
}

export default LocationInput;
