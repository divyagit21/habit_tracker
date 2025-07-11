import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval); 
  }, []);
  return (
    <>
      <div className="currtime">
        <div className="curr_time">
          <div>Time :</div>
          <div>{time}</div>
        </div>
      </div>
      <StyleSheet />
    </>
  );
};

const StyleSheet = () => {
  return (
    <style>{`
      .currtime {
       min-height:420px;
        width: 13%;
        font-size: clamp(0.8rem, 2.3vw, 2.5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 25px;
        padding: 8px;
        font-weight: bold;
        background-color: var(--color-primary);
        color: var(--color-text);
      }
        @media (max-width: 768px) {
        .currtime {
            min-height:auto;
            flex-direction:row;
            gap:5%;
            width:85%;
        }
    }
    `}</style>
  );
};

export default Time;
