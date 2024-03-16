import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  timeLeft: number; // Adicionamos uma prop para receber o tempo restante
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  const [seconds, setSeconds] = useState(timeLeft); // Inicialize os segundos com o tempo restante

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0)); // Certifique-se de que os segundos não sejam negativos
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]); // Atualize o efeito quando o tempo restante mudar

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="text-lg font-bold">
      {`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
    </div>
  );
};

export default CountdownTimer;
