import { useState } from 'react';
import './PlanetSearch.css';
import planeta from '../assets/planeta.png';
import Home from '../inicio/Home';

const predefinedCountries = [
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
  const [query, setQuery] = useState('');
  const [info, setInfo] = useState(null);
  const [isCapitalSearch, setIsCapitalSearch] = useState(false);

  const [languageQuery, setLanguageQuery] = useState('');
  const [languageResults, setLanguageResults] = useState([]);
  const [showLanguageResults, setShowLanguageResults] = useState(false);

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery) return;

    try {
      let res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(searchQuery)}`);
      let data = await res.json();

      if (!Array.isArray(data) || data.status === 404) {
        res = await fetch(`https://restcountries.com/v3.1/capital/${encodeURIComponent(searchQuery)}`);
        data = await res.json();
        setIsCapitalSearch(true);
      } else {
        setIsCapitalSearch(false);
      }

      const countryData = data[0];

      const result = {
        country: countryData.name.common,
        population: countryData.population,
        capital: countryData.capital?.[0] || 'No capital info',
        region: countryData.region,
        languages: Object.values(countryData.languages || {}).join(', ')
      };

      setInfo(result);
      setQuery(searchQuery);
      setShowSearch(true);
      setShowLanguageResults(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLanguageSearch = async () => {
    if (!languageQuery.trim()) return;

    try {
      const res = await fetch(`https://restcountries.com/v3.1/lang/${encodeURIComponent(languageQuery.trim().toLowerCase())}`);
      const data = await res.json();

      const resultList = data.map(c => ({
        name: c.name.common,
        capital: c.capital?.[0] || 'Sin capital',
        region: c.region,
        population: c.population.toLocaleString()
      }));

      setLanguageResults(resultList);
      setShowLanguageResults(true);
      setInfo(null);
      setShowSearch(true);
    } catch (error) {
      console.error('Error buscando por idioma:', error);
    }
  };

  const handleRandom = () => {
    const randomCountry = predefinedCountries[Math.floor(Math.random() * predefinedCountries.length)];
    handleSearch(randomCountry);
  };

  return (
    <>
    <Home />
    <div className={`container ${showLanguageResults ? 'move-up' : ''}`}>
      <img
        src={planeta}
        alt="Planeta"
        className={`planet ${showSearch ? 'fade-out' : 'fade-in'}`}
        onClick={() => setShowSearch(true)}
      />

      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Nombre de país o capital"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => handleSearch()}>Buscar</button>
          <button onClick={handleRandom} className="search-button">Aleatorio</button>

          <input
            type="text"
            placeholder="Buscar por idioma (ej: spanish)"
            value={languageQuery}
            onChange={(e) => setLanguageQuery(e.target.value)}
          />
          <button onClick={handleLanguageSearch}>Buscar por idioma</button>
        </div>
      )}

      {info && (
        <div className="info-box">
          <h2>Información</h2>
          <p><strong>País:</strong> {info.country}</p>
          <p><strong>Capital:</strong> {info.capital}</p>
          <p><strong>Región:</strong> {info.region}</p>
          <p><strong>Población:</strong> {info.population.toLocaleString()}</p>
          <p><strong>Idiomas:</strong> {info.languages}</p>

          <button className="register-button" onClick={async () => {
            try {
              await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  country: info.country,
                  capital: info.capital,
                  region: info.region,
                  population: info.population,
                  languages: info.languages,
                  timestamp: new Date().toISOString()
                }),
              });
              alert('¡Búsqueda registrada!');
            } catch (error) {
              console.error('Error registrando búsqueda:', error);
              alert('Ocurrió un error al registrar');
            }
          }}>
            Registrar búsqueda
          </button>

          <button className="view-posts-button" onClick={() => {
            window.open('https://jsonplaceholder.typicode.com/posts', '_blank');
          }}>
            Ver registros
          </button>
        </div>
      )}

      {showLanguageResults && languageResults.length > 0 && (
        <div className="language-results">
          <h3>Países que hablan: {languageQuery}</h3>
          <table>
            <thead>
              <tr>
                <th>País</th>
                <th>Capital</th>
                <th>Región</th>
                <th>Población</th>
              </tr>
            </thead>
            <tbody>
              {languageResults.map((c, index) => (
                <tr key={index}>
                  <td>{c.name}</td>
                  <td>{c.capital}</td>
                  <td>{c.region}</td>
                  <td>{c.population}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default PlanetSearch;
