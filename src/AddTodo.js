// AddTodo.js
import React, { useState } from 'react';
import './AddTodo.css';


const AddTodo = ({ onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoScheduledDate, setNewTodoScheduledDate] = useState('');
  const [newTodoFolder, setNewTodoFolder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title: newTodoTitle,
      description: newTodoDescription,
      scheduledDate: newTodoScheduledDate,
      folder: newTodoFolder,
      completed: false,
    };

    // Call the parent component's onAddTodo function to add the new todo to the state
    onAddTodo(newTodo);

    // Reset form fields
    setNewTodoTitle('');
    setNewTodoDescription('');
    setNewTodoScheduledDate('');
    setNewTodoFolder('');
  };

  return (
    <div className="add-todo-container">
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Scheduled Date"
          value={newTodoScheduledDate}
          onChange={(e) => setNewTodoScheduledDate(e.target.value)}
        />
        <select
          value={newTodoFolder}
          onChange={(e) => setNewTodoFolder(e.target.value)}
        >
          <option value="">Select Folder</option>
          {/* Add options for folders */}
        </select>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
