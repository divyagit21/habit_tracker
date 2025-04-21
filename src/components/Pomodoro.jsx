import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';

const Pomodoro = () => {
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const toggleMute = () => setIsMuted(prev => !prev);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setHr(0);
    setMin(25);
    setSec(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSec(prevSec => {
          if (prevSec > 0) {
            return prevSec - 1;
          } else {
            setMin(prevMin => {
              if (prevMin > 0) {
                setSec(59);
                return prevMin - 1;
              } else {
                setHr(prevHr => {
                  if (prevHr > 0) {
                    setMin(59);
                    setSec(59);
                    return prevHr - 1;
                  } else {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return 0;
                  }
                });
                return 0;
              }
            });
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (val) => String(val).padStart(2, '0');

  const renderOptions = (max) => {
    return [...Array(max + 1).keys()].map((num) => (
      <option key={num} value={num}>{formatTime(num)}</option>
    ));
  };

  return (
    <>
      <div className="pomodoro">
        <div className="time">
          <div>{`${formatTime(hr)}:${formatTime(min)}:${formatTime(sec)}`}</div>
          <div className="controls">
            <IconButton onClick={toggleTimer} style={{ color: 'var(--color-text)' }}>
              {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={resetTimer} style={{ color: 'var(--color-text)' }}>
              <ReplayIcon />
            </IconButton>
          </div>
        </div>
        <div className="dropdowns">
          <select className='select' disabled={isRunning} value={hr} onChange={(e) => setHr(Number(e.target.value))}>
            {renderOptions(5)}
          </select>
          <select className='select' disabled={isRunning} value={min} onChange={(e) => setMin(Number(e.target.value))}>
            {renderOptions(59)}
          </select>
          <select className='select' disabled={isRunning} value={sec} onChange={(e) => setSec(Number(e.target.value))}>
            {renderOptions(59)}
          </select>
        </div>
      </div>
      <StyleSheet />
    </>
  );
};

const StyleSheet = () => (
  <style>
    {`
     .select{
      background-color:var(--color-secondary);
      color:var(--color-text);
      font-weight:bold;
     }
      .controls {
        display: flex;
         align-items: center;
        justify-content: center;
      }
      .sound {
        display: flex;
        align-items: center;
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
      }

      .pomodoro {
        width: 250px;
        font-size: clamp(1.2rem, 2.5vw, 2rem);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 25px;
        padding: 4px;
        color: var(--color-text);
      }

      .dropdowns {
        margin-top: 8px;
        display: flex;
        gap: 8px;
      }

      select {
        font-size: 1rem;
        padding: 3px 8px;
        border-radius: 8px;
        border: none;
      }
    `}
  </style>
);

export default Pomodoro;
