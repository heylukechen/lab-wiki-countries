import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CountriesList = (props) => {
  const [allContries, setAllCountries] = useState([]);

  useEffect(() => {
    setAllCountries(props.countries);
  }, [props.countries]);

  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {allContries.map((country) => {
          return (
            <Link
              key={country.alpha3Code}
              className="list-group-item list-group-item-action"
              to={`/${country.alpha3Code}`}
            >
              {getFlagEmoji(country.alpha2Code)} {country.name.common}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;
