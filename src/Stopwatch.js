import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10); // every 10ms
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const handleLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="stopwatch-ui" style={{ position: 'relative' }}>
      <h2 className="title">STOPWATCH</h2>

      <div className="analog-clock">
        {/* You can replace this with SVG or canvas later */}
        <div className="dial"></div>
      </div>

      <div className="digital-time">{formatTime(time)}</div>

      <div className="buttons-row">
        <button className="reset-btn" onClick={handleReset}>RESET</button>
        <button
          className="start-btn"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'STOP' : 'START'}
        </button>
      </div>

      <button
        className="lap-btn"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 1000
        }}
        onClick={handleLap}
      >
        +
      </button>

      <div className="laps">
        {laps.map((lap, idx) => (
          <div key={idx} className="lap-entry">
            <span>Lap {idx + 1}</span>
            <span>{lap}</span>
          </div>
        ))}
      </div>

      <div className="angled-accent"></div>
    </div>
  );
};

export default Stopwatch;
