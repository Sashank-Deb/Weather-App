import React, {useState} from "react";
import {Line} from "react-chartjs-2";
const api = {
  key: "e72904ae768cb10890bd228d2f225dd2",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [daily, setDaily] = useState({});
  const [data, setData] = useState({});

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
              .then((result1) => result1.json())
              .then((result1) => {
                setDaily(result1);
                console.log("Onecall API is:", result1);

                const data = {
                  labels: ["07h", "09h", "11h", "13h", "15h", "17h"],
                  datasets: [
                    {
                      label: "Temperature",
                      fill: true,
                      tension: 0.4,
                      backgroundColor: ["rgba(0,122,255,0.2)"],
                      borderColor: ["rgb(0,122,255)"],
                      borderWidth: 3,
                      pointRadius: 6,
                      pointBackgroundColor: ["rgba(0,122,255,1)"],
                      pointBorderColor: ["rgba(0,122,255,0.2)"],
                      pointBorderWidth: 5,
                      data: [
                        result1.hourly[7].temp,
                        result1.hourly[9].temp,
                        result1.hourly[11].temp,
                        result1.hourly[13].temp,
                        result1.hourly[15].temp,
                        result1.hourly[17].temp,
                        result1.hourly[19].temp
                      ]
                    }
                    // {
                    //   label: 'Data 2',
                    //     backgroundColor: ['rgba(255, 99, 132, 0.9)'],
                    //     borderColor: ['rgb(255, 99, 132)'],
                    //     borderWidth: 3,
                    //     data: [result1.hourly[8].temp, result1.hourly[10].temp, result1.hourly[12].temp, result1.hourly[14].temp, result1.hourly[16].temp, result1.hourly[18].temp, result1.hourly[20].temp]
                    // }
                  ]
                };
                setData(data);
              });
          }
          setWeather(result);
          console.log("Weather API is:", result);
        });
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    interaction: {
      intersect: false,
      mode: "index"
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          // color: 'red',
          font: {
            weight: "bold"
          }
        }
      },
      y: {
        // title: {
        //   display: true,
        //   text: 'Value'
        // },
        display: false,
        // min: 20,
        // max: 30,
        ticks: {
          stepSize: 1
        }
      }
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
      "Thrusday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear().toString().substr(-2);

    return `${day} | ${date} ${month} '${year}`;
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
    // <div className={
    //     typeof weather.main !== "undefined"
    //       ? weather.main.temp > 20
    //         ? "app warm"
    //         : "app"
    //       : "app"
    //   }
    // >
    <div className="app">
      <div className="topicon">
        {typeof weather.main !== "undefined" ? (
          weather.weather[0].icon === "50d" ||
          weather.weather[0].icon === "50n" ||
          weather.weather[0].main === "Clouds" ||
          weather.weather[0].main === "Snow" ? (
            <svg
              viewBox="0 0 940 940"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cloud"
            >
              <g mask="url(#mask0)">
                <path
                  d="M151.907 694.733C135.682 651.411 135.682 587.332 135.682 587.332L151.907 376.14L216.036 217.295L737.568 191.122H907.549L940 431.195L794.744 544.011C794.744 544.011 681.939 812.964 665.713 831.014C649.487 849.065 470.234 942.025 426.194 938.415C382.154 934.805 168.132 738.054 151.907 694.733Z"
                  fill="#C4C4C4"
                  fillOpacity="0.2"
                />
                <path
                  d="M16.0532 382.742C31.757 338.209 71.7131 291.144 71.7131 291.144L214.71 148.746L358.455 82.3341L738.287 471.813L856.765 605.02L729.688 806.777L558.097 775.805C558.097 775.805 311.767 884.943 289.202 885.485C266.637 886.027 83.7318 813.831 55.2866 776.667C26.8414 739.503 0.34946 427.275 16.0532 382.742Z"
                  fill="#C4C4C4"
                  fillOpacity="0.2"
                />
                <path
                  d="M82.1755 260.152C106.795 222.581 154.789 191.594 154.789 191.594L320.791 106.092L470.694 94.9803L741.864 616.636L823.856 790.783L659.702 940.12L505.141 845.858C505.141 845.858 249.29 860.345 227.944 852.45C206.598 844.555 50.5097 705.863 31.9704 658.998C13.431 612.133 57.5555 297.724 82.1755 260.152Z"
                  fill="#C4C4C4"
                  fillOpacity="0.2"
                />
              </g>
            </svg>
          ) : weather.weather[0].main === "Drizzle" ||
            weather.weather[0].main === "Rain" ||
            weather.weather[0].main === "Thunderstorm" ? (
            <svg
              viewBox="0 0 940 940"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rain"
            >
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 344.893 534.123)"
                fill="url(#paint0_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 562.724 742.407)"
                fill="url(#paint1_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 266.277 642.793)"
                fill="url(#paint2_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 266.277 534.123)"
                fill="url(#paint3_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 405.493 597.514)"
                fill="url(#paint4_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 303.947 731.54)"
                fill="url(#paint5_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 190.937 577.591)"
                fill="url(#paint6_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 110.683 635.548)"
                fill="url(#paint7_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 100.856 497.9)"
                fill="url(#paint8_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 467.73 572.158)"
                fill="url(#paint9_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 541.433 472.544)"
                fill="url(#paint10_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 567.638 499.711)"
                fill="url(#paint11_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 469.368 684.45)"
                fill="url(#paint12_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888791 -0.458312 -0.388549 0.921428 353.082 785.875)"
                fill="url(#paint13_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 574.189 608.381)"
                fill="url(#paint14_linear)"
                fillOpacity="0.4"
              />
              <rect
                width="3.53709"
                height="148.503"
                rx="1.76854"
                transform="matrix(-0.888792 -0.458312 -0.388549 0.921428 403.855 497.9)"
                fill="url(#paint15_linear)"
                fillOpacity="0.4"
              />
              <path
                d="M104.706 632.116C87.5093 588.648 87.5089 524.352 87.5089 524.352L104.706 312.446L172.676 153.064L725.444 126.802H905.605L940 367.686L786.044 480.884C786.044 480.884 666.483 750.747 649.285 768.859C632.087 786.971 442.099 880.246 395.421 876.623C348.743 873.001 121.903 675.584 104.706 632.116Z"
                fill="#6079B9"
                fillOpacity="0.2"
              />
              <path
                d="M548.234 897.393C504.67 910.317 440.137 903.693 440.137 903.693L227.389 864.455L67.1693 779.246L38.7664 217.133L38.1 34.8078L279.743 24.8199L393.926 192.289C393.926 192.289 665.223 341.092 683.465 360.362C701.707 379.633 796.027 581.514 792.564 628.379C789.101 675.244 591.798 884.468 548.234 897.393Z"
                fill="#6079B9"
                fillOpacity="0.2"
              />
              <path
                d="M25.6538 652.552C9.92862 609.055 12.1441 544.871 12.1441 544.871L36.6709 333.44L110.238 174.751L664.762 151.914L845.2 153.015L871.346 393.689L713.252 505.748C713.252 505.748 584.206 774.41 566.358 792.384C548.509 810.359 355.014 902.31 308.389 898.409C261.765 894.508 41.3791 696.049 25.6538 652.552Z"
                fill="#6079B9"
                fillOpacity="0.4"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint9_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint10_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint11_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint12_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint13_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint14_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint15_linear"
                  x1="1.76854"
                  y1="0"
                  x2="1.76854"
                  y2="148.503"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.1" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          ) : weather.weather[0].icon === "01d" &&
            weather.weather[0].main === "Clear" ? (
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
          ) : (
            <svg
              viewBox="0 0 940 960"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="dark"
            >
              <g>
                <circle cx="490" cy="486" r="470" fill="black" />
              </g>
            </svg>
          )
        ) : (
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
        )}
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
                        {Math.round(weather.main.temp)}
                        {"°"}
                      </div>
                      <div className="weather">
                        {weather.weather[0].description
                          .charAt(0)
                          .toUpperCase() +
                          weather.weather[0].description.slice(1)}
                      </div>
                    </div>

                    <div className="weatherfooter">
                      <div className="weatherdetailsicon">
                        <svg
                          width="20"
                          height="20"
                          className="w-icon"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M6.67163 15.8331V17.4997"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6.67163 10.8331V12.4997"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M13.3383 15.8331V17.4997"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M13.3383 10.8331V12.4997"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10.0049 17.4998V19.1664"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10.0049 12.4998V14.1664"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M16.6716 13.8164C17.5477 13.4327 18.265 12.7594 18.7034 11.9094C19.1417 11.0593 19.2742 10.0844 19.0788 9.14823C18.8833 8.21204 18.3718 7.37158 17.63 6.76794C16.8882 6.16429 15.9613 5.8342 15.005 5.83307H13.955C13.6908 4.81017 13.1873 3.8647 12.486 3.07457C11.7848 2.28445 10.9057 1.6723 9.92142 1.28859C8.93711 0.90488 7.87571 0.760588 6.82469 0.86761C5.77367 0.974633 4.76313 1.3299 3.87636 1.90414C2.9896 2.47838 2.252 3.25514 1.72437 4.1704C1.19674 5.08567 0.894178 6.11322 0.841628 7.16837C0.789077 8.22351 0.988042 9.27604 1.42212 10.2392C1.8562 11.2024 2.51297 12.0486 3.33828 12.7081"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="weatherdetails">
                        {daily.daily[0].humidity}% | UV{" "}
                        {Math.round(daily.current.uvi)}
                      </div>
                    </div>

                    <div className="chart">
                      <Line data={data} options={options}></Line>
                    </div>

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
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
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
                Enter Your Location
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
