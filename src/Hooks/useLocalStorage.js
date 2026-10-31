import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue, validate = () => true) {
  // Read saved data once when the app starts.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved === null) return initialValue;

      const parsed = JSON.parse(saved);
      return validate(parsed) ? parsed : initialValue;
    } catch (error) {
      console.error(`Could not read local storage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save the latest value whenever it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Could not save local storage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
