import React, { useMemo, useState } from "react";

const API_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const iconFor = (condition = "") => ({ Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️", Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Smoke: "🌫️", Haze: "🌫️", Dust: "🌫️", Fog: "🌫️", Sand: "🌫️", Ash: "🌫️", Squall: "💨", Tornado: "🌪️" }[condition] || "🌤️");

const formatInLocation = (timestamp, offset, options) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(new Date((timestamp + offset) * 1000));

const dailyForecasts = (items) => {
  const byDay = items.reduce((days, item) => {
    const day = new Date(item.dt * 1000).toISOString().slice(0, 10);
    if (!days[day]) days[day] = [];
    days[day].push(item);
    return days;
  }, {});
  return Object.values(byDay).slice(0, 5).map((day) => {
    const noon = day.reduce((closest, item) => Math.abs(new Date(item.dt * 1000).getUTCHours() - 12) < Math.abs(new Date(closest.dt * 1000).getUTCHours() - 12) ? item : closest);
    return { dt: noon.dt, condition: noon.weather[0].main, description: noon.weather[0].description, low: Math.round(Math.min(...day.map((item) => item.main.temp_min))), high: Math.round(Math.max(...day.map((item) => item.main.temp_max))) };
  });
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const fiveDays = useMemo(() => dailyForecasts(forecast), [forecast]);

  const search = async (event) => {
    event.preventDefault();
    const city = query.trim();
    if (!city) return;
    if (!API_KEY) { setError("Add a valid OpenWeather API key to .env.local before searching."); return; }
    setStatus("loading"); setError("");
    try {
      const params = `q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
      const [weatherResponse, forecastResponse] = await Promise.all([fetch(`${API_BASE}/weather?${params}`), fetch(`${API_BASE}/forecast?${params}`)]);
      const [weatherResult, forecastResult] = await Promise.all([weatherResponse.json(), forecastResponse.json()]);
      if (!weatherResponse.ok || !forecastResponse.ok) throw new Error(weatherResult.message || forecastResult.message || "Unable to load weather.");
      setWeather(weatherResult); setForecast(forecastResult.list); setQuery(""); setStatus("success");
    } catch (requestError) { setStatus("error"); setError(requestError.message || "Unable to load weather. Please try again."); }
  };

  return <div className="app-shell"><main className="weather-app">
    <header className="app-header"><a className="brand" href="/" aria-label="Haze Weather home"><span className="brand-mark" aria-hidden="true">☁</span><span>Haze</span></a><p>Simple weather, wherever you are.</p></header>
    <form className="search-form" onSubmit={search} role="search"><label className="sr-only" htmlFor="city-search">Search for a city</label><input id="city-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a city" autoComplete="address-level2" disabled={status === "loading"} /><button type="submit" disabled={status === "loading"}>{status === "loading" ? "Searching…" : "Search"}</button></form>
    {error && <p className="message error" role="alert">{error}</p>}
    {!weather && !error && <section className="empty-state" aria-live="polite"><span aria-hidden="true">☀️</span><h1>Find your forecast</h1><p>Search for any city to see current weather and a five-day outlook.</p></section>}
    {weather && <><section className="current-weather" aria-labelledby="location-name"><div className="location-row"><div><p className="eyebrow">Current weather</p><h1 id="location-name">{weather.name}, {weather.sys.country}</h1><p className="location-date">{formatInLocation(weather.dt, weather.timezone, { weekday: "long", month: "long", day: "numeric" })}</p></div><span className="weather-icon" role="img" aria-label={weather.weather[0].description}>{iconFor(weather.weather[0].main)}</span></div><div className="temperature-row"><p className="temperature">{Math.round(weather.main.temp)}<span>°</span></p><div className="condition"><strong>{weather.weather[0].main}</strong><span>Feels like {Math.round(weather.main.feels_like)}°</span><span>H: {Math.round(weather.main.temp_max)}° &nbsp; L: {Math.round(weather.main.temp_min)}°</span></div></div><dl className="weather-details"><div><dt>Humidity</dt><dd>{weather.main.humidity}%</dd></div><div><dt>Wind</dt><dd>{Math.round(weather.wind.speed * 3.6)} km/h</dd></div><div><dt>Visibility</dt><dd>{weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "—"}</dd></div></dl></section>
    <section className="forecast-section" aria-labelledby="forecast-heading"><div className="section-heading"><h2 id="forecast-heading">Five-day forecast</h2><span>°C</span></div><div className="forecast-grid">{fiveDays.map((day) => <article className="forecast-card" key={day.dt}><p>{formatInLocation(day.dt, weather.timezone, { weekday: "short" })}</p><span className="forecast-icon" role="img" aria-label={day.description}>{iconFor(day.condition)}</span><p className="forecast-description">{day.description}</p><p><strong>{day.high}°</strong> <span>{day.low}°</span></p></article>)}</div></section></>}
  </main></div>;
}

export default App;
