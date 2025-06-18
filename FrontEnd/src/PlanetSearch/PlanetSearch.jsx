import { useState } from 'react';
import './PlanetSearch.css';
import planeta from '../assets/planeta.png';

const predefinedCountries = [ /* lo hago asi porque la api no deja hacer paises randoms xd */
  "Argentina", "Brasil", "Canadá", "Alemania", "Japón",
  "Australia", "Egipto", "Francia", "India", "México",
  "Noruega", "Italia", "España", "Sudáfrica", "Suecia",
  "China", "Turquía", "Corea del Sur", "Reino Unido", "Estados Unidos",
  "Afganistán", "Albania", "Argelia", "Armenia", "Austria",
  "Azerbaiyán", "Bangladés", "Bielorrusia", "Bélgica", "Bolivia",
  "Bosnia y Herzegovina", "Bulgaria", "Camboya", "Camerún", "Chile",
  "Colombia", "Corea del Norte", "Costa Rica", "Croacia", "Cuba",
  "Dinamarca", "Ecuador", "Eslovaquia", "Eslovenia", "Emiratos Árabes Unidos",
  "Escocia", "Estonia", "Etiopía", "Filipinas", "Finlandia"
];

const PlanetSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [info, setInfo] = useState(null);

  const handleSearch = async (searchCountry = country, searchCity = city) => {
    if (!searchCountry) return;

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(searchCountry)}`);
      const data = await res.json();
      const countryData = data[0];

      const result = {
        country: countryData.name.common,
        population: countryData.population,
        languages: Object.values(countryData.languages || {}).join(', '),
        capital: countryData.capital?.[0] || 'No capital info',
        region: countryData.region,
        city: searchCity || countryData.capital?.[0] || 'No city'
      };

      setInfo(result);
      setCountry(searchCountry);
      setCity(searchCity || '');
      setShowSearch(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRandom = () => {
    const randomCountry = predefinedCountries[Math.floor(Math.random() * predefinedCountries.length)];
    handleSearch(randomCountry);
  };

  return (
    <div className="container">
      <img
        src={planeta}
        alt="Planeta"
        className={`planet ${showSearch ? 'move-left fade-out' : 'fade-in'}`}
        onClick={() => setShowSearch(true)}
      />

      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Nombre del país"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ciudad (opcional)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => handleSearch()}>Buscar</button>
          <button onClick={handleRandom} className="search-button">Aleatorio</button>
        </div>
      )}

      


      {info && (
        <div className="info-box">
          <h2>Información</h2>
          <p><strong>País:</strong> {info.country}</p>
          {info.city && <p><strong>Ciudad:</strong> {info.city}</p>}
          <p><strong>Capital:</strong> {info.capital}</p>
          <p><strong>Región:</strong> {info.region}</p>
          <p><strong>Población:</strong> {info.population.toLocaleString()}</p>
          <p><strong>Idiomas:</strong> {info.languages}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetSearch;
