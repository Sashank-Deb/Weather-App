import React, { useState } from "react";
import bgblack from "./bgblack.svg";
const api = {
  key: "e72904ae768cb10890bd228d2f225dd2",
  base: "https://api.openweathermap.org/data/2.5/"
};


function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [daily, setDaily] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          const image = result.weather[0].icon;
          console.log(image);
          if (result.cod !== "404") {
            const lon = result.coord.lon;
            const lat = result.coord.lat;
            console.log(lon);
            console.log(lat);
            setQuery("");
            fetch(
              `${api.base}onecall?lat=${lat}&lon=${lon}&exclude={minutely}&units=metric&APPID=${api.key}`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              });
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
ds
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="icon"
                  className="w-icon"
                ></img>
              </div>
              <div className="bg">
                <img src={bgblack} alt="bgblack"></img>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Location</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">T°c</div>
              <div className="weather">Description</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
