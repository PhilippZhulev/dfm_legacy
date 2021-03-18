import { useState, useEffect } from 'react';

const useInit = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);

  return state;
};

export default useInit;
