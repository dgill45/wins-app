// src/components/AddTask.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/tasks', { name: taskName }).then((response) => {
      onTaskAdded(response.data);
      setTaskName('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
