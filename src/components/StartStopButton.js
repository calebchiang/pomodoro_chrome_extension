import React from 'react';
import '../styles/StartStopButton.css';

const StartStopButton = ({ isRunning, handleStartStop }) => {
    return (

        <button className="start-button play-bold" onClick={handleStartStop}>
            {isRunning ? 'Stop' : "Start"}
        </button>
    );
};

export default StartStopButton;

