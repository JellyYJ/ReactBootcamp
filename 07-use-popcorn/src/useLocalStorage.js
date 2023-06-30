import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedVal = localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) : initialState;
    // return JSON.parse(storedVal);
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
