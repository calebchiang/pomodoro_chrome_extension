import React from 'react';
import '../styles/TimerDisplay.css';


const TimerDisplay = ({ timeLeft, fontClass }) => {
    return (
        <div className = {`timerDisplay sixtyfour ${fontClass}`}>
            {timeLeft}
        </div>
    );

};

export default TimerDisplay;