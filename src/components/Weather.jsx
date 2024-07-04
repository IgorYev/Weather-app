import { useState, useEffect } from 'react';
import css from './Weather.module.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Kyiv');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=50.4547&longitude=30.5238&current=temperature_2m,precipitation,rain,wind_speed_10m&wind_speed_unit=ms`);
      const data = await response.json();
      setWeather(data.current);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className={css.weather_container}>
      <h1 className={css.weather_header}>{location}</h1>
      {weather ? (
        <div>
          <p className={css.weather_info}>Temperature: {weather.temperature_2m}°C</p>
          <p className={css.weather_info}>Wind Speed: {weather.wind_speed_10m} m/s</p>
          <p className={css.weather_info}>Precipitation: {weather.precipitation} mm/h, Rain: {weather.rain} mm/h</p>
        </div>
      ) : (
        <p className={css.loading_text}>Loading...</p>
      )}
    </div>
  );
};

export default Weather;