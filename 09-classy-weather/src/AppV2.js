import { useEffect, useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export default function App() {
  const [input, setInput] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  // Save location in the localStorage
  useEffect(function () {
    setInput(localStorage.getItem("location") || "");
  }, []);

  useEffect(
    function () {
      const geoController = new AbortController();
      const weatherController = new AbortController();
      async function fetchWeatherData() {
        try {
          // 1) Getting location (geocoding)
          setError("");
          setIsLoading(true);
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${input}`,
            { signal: geoController.signal }
          );

          if (!geoRes.ok) {
            throw new Error("Something went wrong with fetching geolocation");
          }

          const geoData = await geoRes.json();
          if (!geoData.results) {
            throw new Error("Location not found");
          }

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);

          setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

          // 2) Getting weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
            { signal: weatherController.signal }
          );

          if (!weatherRes.ok) {
            throw new Error("Something went wrong with fetching weather");
          }

          const weatherData = await weatherRes.json();
          setWeather(weatherData.daily);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      localStorage.setItem("location", input);

      if (input.length < 2) {
        setError("");
        setWeather({});
        return;
      }

      fetchWeatherData();

      return function () {
        geoController.abort();
        weatherController.abort();
      };
    },
    [input]
  );

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input input={input} onInput={setInput} />

      {isLoading && !error && <Loader />}

      {error && <ErrorMessage message={error} />}

      {weather.weathercode && !error && !isLoading && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}

function Input({ input, onInput }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search location..."
      value={input}
      onChange={(e) => onInput(e.target.value)}
    />
  );
}

function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  useEffect(
    function () {
      if (!location) {
        return;
      }
      document.title = `Weather: ${location}`;

      return function () {
        document.title = "Classy Weather";
      };
    },
    [location]
  );

  return (
    <div>
      <h2>Weather in {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day(props) {
  const { date, min, max, code, isToday } = props;
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg;C &mdash; <strong>{Math.ceil(max)}&deg;C</strong>
      </p>
    </li>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="loader">{message}</p>;
}
