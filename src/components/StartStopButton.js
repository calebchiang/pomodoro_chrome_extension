import React from 'react';

const StartStopButton = ({ isRunning, handleStartStop }) => {
    return (
        <button onclick={handleStartStop}>
            {isRunning ? 'Stop' : "Start"}
        </button>
    );
};

export default StartStopButton;

