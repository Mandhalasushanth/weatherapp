import React, { useEffect, useRef,useState } from 'react';
import './Weather.css';
import search_icon from '../assets/serachh.png';
import cloud_icon from '../assets/cloud.png';
import sunny_icon from '../assets/sunny.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef =useRef()
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const allIcons = {
    "01d": cloud_icon,
    "01n": cloud_icon,
    "02d": sunny_icon,
    "02n": sunny_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": humidity_icon,
    "04n": humidity_icon,
    "09d": wind_icon,
    "09n": wind_icon,
  };

  const search = async (cityName) => {

    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        const icon = allIcons[data.weather[0].icon] || cloud_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef}
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={() => search(city)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather" className="weather-icon" />
          <p className="temperture">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
