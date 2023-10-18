import { createContext, useState, useEffect, useContext } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); // IMPORTANT! need ({}) cause we have an arracy of info for each city not just one

  useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Get the corresponding city contents
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  // Create city
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        // basic code for sending data to an API
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      // console.log(data);
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  // Delete city
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // console.log(data);
      setCities((cities) => cities.filter((city) => city.id !== id)); // deleting is basically filtering
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext); // tell React which context we want to read from
  if (context === undefined) {
    throw new Error("CitiesContext is used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
