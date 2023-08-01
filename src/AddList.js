// AddList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddList.css';

const AddList = ({ onAddList }) => {
  const [newListName, setNewListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim() === '') {
      // Prevent adding an empty list
      return;
    }

    const newList = {
      id: Math.random().toString(36).substr(2, 9),
      name: newListName,
    };

    // Call the parent component's onAddList function to add the new list to the state
    onAddList(newList);

    // Reset form field
    setNewListName('');
  };

  return (
    <div className="add-list-container">
      <h2>Add New List/Folder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="List/Folder Name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button type="submit">Add List/Folder</button>
      </form>
      <Link to="/app">Go back to Todo List</Link>
    </div>
  );
};

export default AddList;
