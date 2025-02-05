// src/components/TaskItem.js
import React, { useState } from 'react';

const TaskItem = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleComplete = () => {
    // Mock API call to mark task as complete
    setCompleted(true);
  };

  return (
    <div>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {task.name}
      </span>
      {!completed && <button onClick={handleComplete}>Complete</button>}
      {completed && (
        <div>
          <p>Notify your group!</p>
          <button>Send Generic Message</button>
          <button>Send Custom Message</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
