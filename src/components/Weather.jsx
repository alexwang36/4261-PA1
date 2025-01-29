import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import enter_icon from '../assets/enter.png';

import { getToken } from 'firebase/messaging';
import { messaging } from "./configuration";
import { database } from './configuration'; 
import { ref, onValue, set } from 'firebase/database';

const Weather = () => {
    const inputRef = useRef();
    const nameRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [visitors, setVisitors] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "10d": snow_icon,
        "10n": snow_icon,
    };

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
        
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });

            const searchRef = ref(database, 'search_history');
            const newSearch = set(ref(database, 'search_history/' + city), {
                city: city,
            });

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }

        if (city.toLowerCase() === 'atlanta') {
            atlantaNotification();
        }
    };

    const atlantaNotification = () => {
        if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Atlanta", {
                        body: "Home of Georgia Tech",
                    });
                }
            });
        }
    };

    const addName = (name) => {
        console.log('yo')
        setVisitors([...visitors, name]);
    }

    useEffect(() => {
        const visitorsRef = ref(database, 'visitors');
        onValue(visitorsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setVisitors(Object.values(data)); 
            }
        });

        const searchHistoryRef = ref(database, 'search_history');
        onValue(searchHistoryRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSearchHistory(Object.values(data)); 
            }
        });

        search("Gold Coast");

    }, []);



    return (
        <div className="container">
            
            {/* */}
            <div className="left-panel">
                <h3>Past Visitors</h3>
                <ul>
                    {visitors.map((visitor, index) => (
                        <li key={index}>{visitor}</li>
                    ))}
                </ul>
            </div>
            
            <div className = "name-input">
                <input ref={nameRef} type="text" placeholder="Enter Your Name" />
                <img src={enter_icon} alt="" onClick={() => addName(nameRef.current.value)} />
            </div>
            {/* */}
            <div className="weather">
                <div className="search-bar">
                    <input ref={inputRef} type="text" placeholder="Search" />
                    <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
                </div>

                {weatherData && (
                    <>
                        <img src={weatherData.icon} alt="" className="weather-icon" />
                        <p className="temperature">{weatherData.temperature}°F</p>
                        <p className="location">{weatherData.location}</p>
                        <div className="weather-data">
                            <div className="col">
                                <img src={humidity_icon} alt="" />
                                <div>
                                    <p>{weatherData.humidity}%</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <img src={wind_icon} alt="" />
                                <div>
                                    <p>{weatherData.windSpeed} mph</p>
                                    <span>Wind Speed</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {}
            <div className="right-panel">
                <h3>Search History</h3>
                <ul>
                    {searchHistory.map((entry, index) => (
                        <li key={index}>
                            {entry.city}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Weather;