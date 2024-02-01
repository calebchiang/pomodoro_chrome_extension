import React, { useState } from 'react';
import '../styles/TaskModal.css';

const TaskModal = ({ tasks, onAddTask, onClose }) => {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (!newTask.trim()) return;
        onAddTask(newTask);
        setNewTask(''); // Reset input field
    };

    return (
        <div className="taskModal roboto-bold">
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={task.completed} onChange={() => {}} /> {task.name}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default TaskModal;
