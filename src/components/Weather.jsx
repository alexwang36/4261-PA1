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

import { database } from './configuration'; // Import the Firebase configuration correctly
import { ref, onValue, set } from 'firebase/database'; // Import the necessary Firebase functions

const Weather = () => {
    const inputRef = useRef();
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

            // Save search history to Firebase
            const searchRef = ref(database, 'search_history');
            const newSearch = set(ref(database, 'search_history/' + city), {
                city: city,
            });

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    };

    // Fetch visitors and search history from Firebase on initial load
    useEffect(() => {
        // Fetch visitors from Firebase
        const visitorsRef = ref(database, 'visitors');
        onValue(visitorsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setVisitors(Object.values(data)); // Convert object to array for easier rendering
            }
        });

        // Fetch search history from Firebase
        const searchHistoryRef = ref(database, 'search_history');
        onValue(searchHistoryRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSearchHistory(Object.values(data)); // Store search history data
            }
        });

        
        search("Gold Coast");

    }, []); // Empty dependency array to run only once after the initial render



    return (
        <div className="container">
            {/* Left Panel: Past Visitors */}
            <div className="left-panel">
                <h3>Past Visitors</h3>
                <ul>
                    {visitors.map((visitor, index) => (
                        <li key={index}>{visitor}</li>
                    ))}
                </ul>
            </div>

            {/* Central Panel: Weather Info */}
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

            {/* Right Panel: Search History */}
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