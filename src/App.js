import React, { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import StartStopButton from './components/StartStopButton';
import TaskModal from './components/TaskModal';
import './App.css';

// Main App component
const App = () => {
    // State for tracking timer status, time left, tasks, modal visibility, session status, and font class
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Timer starts at 25 minutes
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inSession, setInSession] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);
    const [fontClass, setFontClass] = useState('roboto-condensed'); // Initial font class for timer
    const fontClasses = ['roboto-condensed', 'sixtyfour', 'honk', 'nunito']; // Font class options for the timer

    // Function to cycle through available fonts
    const changeFont = () => {
        const currentIndex = fontClasses.indexOf(fontClass);
        const nextIndex = (currentIndex + 1) % fontClasses.length;
        setFontClass(fontClasses[nextIndex]);
    };

    // Function to add a new task
    const addTask = (taskName) => {
        const newTask = { name: taskName, completed: false };
        setTasks([...tasks, newTask]);
    };

    // Functions to handle modal visibility
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Effect hook to handle timer functionality
    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
                if (timeLeft === 1) { // Transition to cooldown when time runs out
                    setIsCooldown(true);
                    setIsRunning(false); // Optionally stop the running state
                    setInSession(false); // Make sure session is marked as ended
                    setTimeLeft(5 * 60); // 5 minutes for cooldown
                }
            }, 1000);
        } else if (isCooldown && timeLeft === 0) {
            // Handle end of cooldown
            setIsCooldown(false);
            // Here you might want to reset for a new session or handle end state
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isCooldown]);

    // Function to start/stop the timer
    const handleStartStop = () => {
        if (!isRunning && !isCooldown) { // Start the session if not running and not in cooldown
            setIsRunning(true);
            setInSession(true);
            setIsCooldown(false); // Make sure cooldown is not active
            setTimeLeft(25 * 60); // Reset timer for 25 minutes
        } else {
            // Stop the session or cooldown
            setIsRunning(false);
            setInSession(false);
            setIsCooldown(false); // Ensure cooldown is deactivated if stopping early
            // Consider resetting timeLeft or handling state appropriately
        }
    };

    // Format the remaining time for display
    const formattedTime = `${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`;

    // JSX for the App component
    return (
        <div className={`App ${inSession ? 'session-background' : ''} ${isCooldown ? 'cooldown-background' : ''}`}>
            {!inSession && (
                <div className={`logo honk-button ${inSession ? 'hide-logo' : ''}`}>
                    Pomo
                </div>
            )}

            <div className={`timer-container ${inSession ? 'session-mode' : ''}`}>
                <TimerDisplay timeLeft={formattedTime} fontClass={fontClass} />
            </div>

            <div className={`button-container ${inSession ? 'session-mode' : ''}`}>
                <StartStopButton isRunning={isRunning} handleStartStop={handleStartStop} />
                <button className="task-button roboto-bold" onClick={handleShowModal}>Add Tasks</button>
            </div>

            {showModal && <TaskModal tasks={tasks} onAddTask={addTask} onClose={handleCloseModal} />}

            <button className="change-timer-btn play-regular" onClick={changeFont}>[ change timer ]</button>
        </div>
    );
};

export default App;
