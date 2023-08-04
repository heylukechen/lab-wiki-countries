import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
// import allCountries from './countries.json';
import CountriesList from './components/CountriesList';
import NavBar from './components/NavBar';
import CountryDetails from './components/CountryDetails';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchedCountries = axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route
              path="/:countryId"
              element={<CountryDetails countries={countries} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
