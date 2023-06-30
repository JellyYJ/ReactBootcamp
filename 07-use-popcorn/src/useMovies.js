import { useState, useEffect } from "react";

const KEY = "2ee860f8";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // register an effect
  useEffect(
    function () {
      // Native broswer API
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetchiing movies.");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      // Not call the fecth movie function when there is no query
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleClose(); // close the current opened movie when start a new search
      fetchMovies();

      // cleanup function
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
