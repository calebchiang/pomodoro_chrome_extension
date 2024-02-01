import React from 'react';

const StartStopButton = ({ isRunning, handleStartStop }) => {
    return (
        <button onClick={handleStartStop}>
            {isRunning ? 'Stop' : "Start"}
        </button>
    );
};

export default StartStopButton;

