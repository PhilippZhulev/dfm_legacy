import { useState, useEffect } from 'react';
import { debounce } from 'helpers';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = debounce(setDebouncedValue, delay);
    handler(value);
    return () => {
      handler.clear();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
