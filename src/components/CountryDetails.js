import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = (props) => {
  const { countryId } = useParams();
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // https://ih-countries-api.herokuapp.com/countries/USA
    const fetchedCountries = axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        setSelectedCountry(response.data);
      })
      .catch((err) => console.log(err));
  }, [countryId]);

  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className="col-7">
      {selectedCountry ? (
        <>
          <h1 style={{ fontSize: '240px' }}>
            {getFlagEmoji(selectedCountry.alpha2Code)}
          </h1>
          <h1>{selectedCountry.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{selectedCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {selectedCountry.area}
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {selectedCountry.borders.map((country) => {
                      return (
                        <li key={country} style={{ listStyleType: 'none' }}>
                          <Link  to={`/${country}`}>
                            {country}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryDetails;
