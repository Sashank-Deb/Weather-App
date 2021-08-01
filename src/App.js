import React, {useState} from "react";
import sun from "./sun.svg";
// import { Line } from 'react-chartjs-2';
const api = {
  key: "e72904ae768cb10890bd228d2f225dd2",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [daily, setDaily] = useState({});
  // const [data, setData] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod !== "404") {
            const lon = result.coord.lon;
            const lat = result.coord.lat;
            console.log("Latitude:", lat);
            console.log("Longitude:", lon);
            setQuery("");
            fetch(
              `${api.base}onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&APPID=${api.key}`
            )
              .then((data1) => data1.json())
              .then((data1) => {
                setDaily(data1);
                console.log("Onecall API is:", data1);

                //   const data = {
                //     labels: ['07h','09h','11h','13h','15h','17h'],
                //     datasets: [{
                //     label: 'My First Dataset',
                //     backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                //     borderColor: ['rgb(255, 99, 132)'],
                //     borderWidth: 3,
                //     data: [daily.hourly[7].temp, daily.hourly[9].temp, daily.hourly[11].temp, daily.hourly[13].temp, daily.hourly[15].temp, daily.hourly[17].temp, daily.hourly[19].temp]
                //   }]
                // }
                // setData(data);
              });
          }
          setWeather(result);
          console.log("Weather API is:", result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    let days = [
      "Sunday |",
      "Monday |",
      "Tuesday |",
      "Wednesday |",
      "Thrusday |",
      "Friday |",
      "Saturday |"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  };
  const dateBuilder1 = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = d.getDay();
    if (day < 6) {
      day = day + 1;
    } else {
      day = 0;
    }
    let day1 = days[day];
    return `${day1}`;
  };
  const dateBuilder2 = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = d.getDay();
    if (day < 5) {
      day = day + 2;
    } else if (day > 5) {
      day = day - 5;
    } else if (day === 5) {
      day = 0;
    }
    let day2 = days[day];
    return `${day2}`;
  };
  const dateBuilder3 = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = d.getDay();
    if (day < 4) {
      day = day + 3;
    } else if (day > 4) {
      day = day - 4;
    } else if (day === 4) {
      day = 0;
    }
    let day3 = days[day];
    return `${day3}`;
  };
  const dateBuilder4 = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = d.getDay();
    if (day < 3) {
      day = day + 4;
    } else if (day > 3) {
      day = day - 3;
    } else if (day === 3) {
      day = 0;
    }
    let day4 = days[day];
    return `${day4}`;
  };
  const dateBuilder5 = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = d.getDay();
    if (day < 2) {
      day = day + 5;
    } else if (day > 2) {
      day = day - 2;
    } else if (day === 2) {
      day = 0;
    }
    let day5 = days[day];
    return `${day5}`;
  };
  const dateBuilder6 = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = d.getDay();
    if (day < 1) {
      day = day + 6;
    } else {
      day = day - 1;
    }
    let day6 = days[day];
    return `${day6}`;
  };

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
      <img src={sun} alt="sunicon" className="sun1"></img>
      {/* display none */}
      <div className="topicon">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 940 940"
          className="sun"
        >
          <g className="sungroup">
            <circle className="st0" cx="470" cy="470" r="470" />
            <circle className="st1" cx="470" cy="470" r="417.8" />
            <circle className="st2" cx="470" cy="470" r="365.6" />
          </g>
        </svg>
      </div>
      <div className="date">{dateBuilder(new Date())}</div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Your Location"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof daily.current !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                <div className="direction">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow"
                  >
                    <circle cx="7.5" cy="7.5" r="7.5" fill="white" />
                    <path
                      d="M10.7782 4.12132L7.24265 11.8995L6.31224 8.58726L3.00001 7.65685L10.7782 4.12132Z"
                      fill="#313131"
                    />
                  </svg>
                </div>

                {typeof weather.main !== "undefined" ? (
                  <div>
                    <div className="locationtext">
                      {weather.name}, {weather.sys.country}
                    </div>
                    <div className="weather-box">
                      <div className="minmax">
                        {Math.round(daily.daily[0].temp.min)}
                        {"°"} | {Math.round(daily.daily[0].temp.max)}
                        {"°"}
                      </div>
                      <div className="temp">
                        {Math.round(daily.current.temp)}
                        {"°"}
                      </div>
                      <div className="weather">
                        {daily.current.weather[0].description
                          .charAt(0)
                          .toUpperCase() +
                          daily.current.weather[0].description.slice(1)}
                      </div>
                    </div>

                    <div className="weatherfooter">
                      <div className="weatherdetailsicon">
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.current.weather[0].icon}@2x.png`}
                          alt="icon"
                          className="w-icon"
                        ></img>
                      </div>
                      <div className="weatherdetails">
                        {daily.current.humidity}% | UV{" "}
                        {Math.round(daily.current.uvi)}
                      </div>
                    </div>

                    {/* <div id="chart">
                      <Line data= {data}></Line>
                        </div> */}

                    <div className="week">
                      <div className="weekbar">
                        <div className="day">{dateBuilder1(new Date())}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.daily[1].weather[0].icon}@2x.png`}
                          alt="icon"
                          className="week-icon"
                        ></img>
                        <div className="max">
                          {Math.round(daily.daily[1].temp.max)}
                          {"°"}
                        </div>
                        <div className="min">
                          {Math.round(daily.daily[1].temp.min)}
                          {"°"}
                        </div>
                      </div>
                      <div className="weekbar">
                        <div className="day">{dateBuilder2(new Date())}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.daily[2].weather[0].icon}@2x.png`}
                          alt="icon"
                          className="week-icon"
                        ></img>
                        <div className="max">
                          {Math.round(daily.daily[2].temp.max)}
                          {"°"}
                        </div>
                        <div className="min">
                          {Math.round(daily.daily[2].temp.min)}
                          {"°"}
                        </div>
                      </div>
                      <div className="weekbar">
                        <div className="day">{dateBuilder3(new Date())}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.daily[3].weather[0].icon}@2x.png`}
                          alt="icon"
                          className="week-icon"
                        ></img>
                        <div className="max">
                          {Math.round(daily.daily[3].temp.max)}
                          {"°"}
                        </div>
                        <div className="min">
                          {Math.round(daily.daily[3].temp.min)}
                          {"°"}
                        </div>
                      </div>
                      <div className="weekbar">
                        <div className="day">{dateBuilder4(new Date())}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.daily[4].weather[0].icon}@2x.png`}
                          alt="icon"
                          className="week-icon"
                        ></img>
                        <div className="max">
                          {Math.round(daily.daily[4].temp.max)}
                          {"°"}
                        </div>
                        <div className="min">
                          {Math.round(daily.daily[4].temp.min)}
                          {"°"}
                        </div>
                      </div>
                      <div className="weekbar">
                        <div className="day">{dateBuilder5(new Date())}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.daily[5].weather[0].icon}@2x.png`}
                          alt="icon"
                          className="week-icon"
                        ></img>
                        <div className="max">
                          {Math.round(daily.daily[5].temp.max)}
                          {"°"}
                        </div>
                        <div className="min">
                          {Math.round(daily.daily[5].temp.min)}
                          {"°"}
                        </div>
                      </div>
                      <div className="weekbar">
                        <div className="day">{dateBuilder6(new Date())}</div>
                        <img
                          src={`https://openweathermap.org/img/wn/${daily.daily[6].weather[0].icon}@2x.png`}
                          alt="icon"
                          className="week-icon"
                        ></img>
                        <div className="max">
                          {Math.round(daily.daily[6].temp.max)}
                          {"°"}
                        </div>
                        <div className="min">
                          {Math.round(daily.daily[6].temp.min)}
                          {"°"}
                        </div>
                      </div>
                    </div>

                    <div className="footer">
                      Powered by One weather <br />
                      Copyright © 2021 Sashank Deb
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>This city doesn't exsist</div>
                    <div>
                      <div className="weather-box">
                        <div className="temp">T°c</div>
                        <div className="weather">Description</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Location</div>
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
