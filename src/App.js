import React, { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import StartStopButton from './components/StartStopButton';
import TaskModal from './components/TaskModal';

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]); // Initial tasks state
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const addTask = (taskName) => {
    const newTask = { name: taskName, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Format timeLeft into minutes and seconds for display
  const formattedTime = `${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`;

  return (
      <div className = "App">
        <div className = "logo honk-button">Pomodoro</div>
        <TimerDisplay timeLeft={formattedTime} />
        <div className = "button-container">
        <StartStopButton isRunning={isRunning} handleStartStop={handleStartStop} />
        <button className = "task-button roboto-bold" onClick={handleShowModal}>Add Tasks</button>
        </div>
        {showModal && <TaskModal tasks={tasks} onAddTask={addTask} onClose={handleCloseModal} />}
      </div>
  );
}

export default App;
