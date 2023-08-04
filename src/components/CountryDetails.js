import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CountryDetails = (props) => {
  const { countryId } = useParams();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { countries } = props;

  useEffect(() => {
    const foundCountry = countries.find(
      (oneCountry) => oneCountry.alpha3Code === countryId
    );
    setSelectedCountry(foundCountry);
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
                        <li style={{listStyleType:"none"}}>
                          <Link key={country} to={`/${country}`}>
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