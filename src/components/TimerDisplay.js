import React from 'react';
import '../styles/TimerDisplay.css';


const TimerDisplay = ({ timeLeft }) => {
    return (
        <div className = "timerDisplay sixtyfour">
            {timeLeft}
        </div>
    );

};

export default TimerDisplay;