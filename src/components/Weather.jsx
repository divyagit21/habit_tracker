import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Proddatur,pdtr&appid=${apiKey}`
        );
        setInfo(response.data);
      } catch (err) {
        console.error('Error loading weather data:', err);
      }
    };
    fetchWeather();
  }, []);

  return (
    <>
      <div className="weather">
        <div>
        <div>Weather :</div>
        {info ? (
          <>
            <div>{info.name}</div>
            <div>{info.main.temp}°C</div>
          </>
        ) : (
          <div>Loading weather...</div>
        )}
        </div>
        <br></br>
        <div className=".curr_time">
          <div>Time :</div>
          <div>{time}</div>
        </div>
      </div>
      <StyleSheet />
    </>
  );
};

const StyleSheet = () => {
  return (
    <style>{`
      .weather {
       min-height:420px;
        width: 13%;
        font-size: clamp(0.8rem, 2.3vw, 2.5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 25px;
        padding: 8px;
        font-weight: bold;
        background-color: var(--color-primary);
        color: var(--color-text);
      }
        @media (max-width: 768px) {
        .weather {
            min-height:auto;
            flex-direction:row;
            gap:5%;
            width:85%;
        }
    }
    `}</style>
  );
};

export default Weather;
