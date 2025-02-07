// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from backend (mock API for now)
    axios.get('http://localhost:5000/api/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
