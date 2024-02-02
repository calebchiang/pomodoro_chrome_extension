import React, { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import StartStopButton from './components/StartStopButton';
import TaskModal from './components/TaskModal';

import './App.css';

const App = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [tasks, setTasks] = useState([]); // Initial tasks state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [inSession, setInSession] = useState(false); // Manage session view
    const [fontClass, setFontClass] = useState('sixtyfour');
    const fontClasses = ['sixtyfour', 'honk', 'nunito', ]; // Array of font classes

    const changeFont = () => {
        const currentIndex = fontClasses.indexOf(fontClass);
        const nextIndex = (currentIndex + 1) % fontClasses.length;
        setFontClass(fontClasses[nextIndex]);
    };

    const addTask = (taskName) => {
        const newTask = {name: taskName, completed: false};
        setTasks([...tasks, newTask]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
            }, 1000);
            setInSession(true); // Transition to session view when timer starts
        } else {
            clearInterval(interval);
            if (timeLeft <= 0) {
                setInSession(false); // Exit session view when timer stops and is complete
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const formattedTime = `${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`;

    return (
        <div className={`App ${inSession ? 'session-background' : ''}`}>
            {!inSession && (
                <div className={`logo honk-button ${inSession ? 'hide-logo' : ''}`}>
                    Pomo
                </div>
            )}

            <div className={`timer-container ${inSession ? 'session-mode' : ''}`}>
                <TimerDisplay timeLeft={formattedTime} fontClass={fontClass} />
            </div>

            {/* Always visible button container */}
            <div className={`button-container ${inSession ? 'session-mode' : ''}`}>
                <StartStopButton isRunning={isRunning} handleStartStop={handleStartStop} />
                <button className="task-button roboto-bold" onClick={handleShowModal}>Add Tasks</button>
            </div>

            {/* New task display container */}
            <div className="task-display-container">
                <h2 className="task-list-heading">Current Tasks:</h2>
                {/* Map through tasks and display them here */}
                {tasks.map((task, index) => (
                    <div key={index} className="task-item">
                        {task.name} {/* Add checkboxes or other task-related UI here */}
                    </div>
                ))}
            </div>


            {showModal && <TaskModal tasks={tasks} onAddTask={addTask} onClose={handleCloseModal} />}

            {/* Session-specific content (like tasks list) goes here, if needed */}
            <button className="change-timer-btn play-regular" onClick={changeFont}>[ change timer ]</button>
        </div>
    );
};

export default App;
