import { useState, useEffect } from 'react';

const useClock = () => {
  const [time, setTime] = useState<number>(600); 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1); 
      }, 1000);

      return () => clearInterval(intervalId); 
    }
  }, [isRunning]);

  const toggleClock = () => {
    setIsRunning((prev) => !prev);
  };


  return { time, isRunning, toggleClock };
};

export default useClock;
