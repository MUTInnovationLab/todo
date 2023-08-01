// App.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import AddTodo from './AddTodo';
import AddList from './AddList'; // Import the AddList component


const App = () => {
    const [searchText, setSearchText] = useState('');
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [newTodoScheduledDate, setNewTodoScheduledDate] = useState('');
    const [newTodoFolder, setNewTodoFolder] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [scheduledTodos, setScheduledTodos] = useState([]);
    const [folders, setFolders] = useState([]);

    // Function to add a new todo
    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            id: Math.random().toString(36).substr(2, 9),
            title: newTodoTitle,
            description: newTodoDescription,
            scheduledDate: newTodoScheduledDate,
            folder: newTodoFolder,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
        setNewTodoDescription('');
        setNewTodoScheduledDate('');
        setNewTodoFolder('');
    };

    // Function to mark a todo as completed
    const markTodoAsCompleted = (todoId) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: true } : todo
        );
        setTodos(updatedTodos);
    };

    // Function to search for a todo
    const searchTodo = () => {
        const filteredTodos = todos.filter(
            (todo) =>
                todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchText.toLowerCase())
        );
        setTodos(filteredTodos);
    };
    // Function to filter todos for Today's Todo category
    const filterTodayTodos = () => {
        const today = new Date().toISOString().split('T')[0];
        const todayTodos = todos.filter((todo) => todo.scheduledDate === today);
        return todayTodos;
    };

    // Function to filter todos for Scheduled Todo category
    const filterScheduledTodos = () => {
        const scheduledTodos = todos.filter((todo) => todo.scheduledDate && !todo.completed);
        return scheduledTodos;
    };

    // Function to show completed todos
    const showCompletedTodos = () => {
        const completed = todos.filter((todo) => todo.completed);
        setCompletedTodos(completed);
    };

    // Function to show scheduled todos
    const showScheduledTodos = () => {
        const scheduled = todos.filter((todo) => todo.scheduledDate);
        setScheduledTodos(scheduled);
    };

    // Function to show todos in a specific folder
    const showTodosInFolder = (folderId) => {
        const todosInFolder = todos.filter((todo) => todo.folder === folderId);
        setTodos(todosInFolder);
    };

    
    const addList = (newList) => {
        setFolders([...folders, newList]);
      };

    // Function to render the list of folders with different categories of todos
    const renderFoldersList = () => {
        return (
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id} onClick={() => showTodosInFolder(folder.id)}>
                        {folder.name}
                    </li>
                ))}
            </ul>
        );
    };

    // Function to sign out the user
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Handle successful sign-out
            })
            .catch((error) => {
                // Handle sign-out error
            });
    };

    // Dummy data for testing
    useEffect(() => {
        setFolders([
            { id: 'folder1', name: 'Personal' },
            { id: 'folder2', name: 'Work' },
        ]);
        setTodos([
            {
                id: 'todo1',
                title: 'Task 1',
                description: 'Complete task 1',
                scheduledDate: '2023-08-01',
                folder: 'folder1',
                completed: false,
            },
            {
                id: 'todo2',
                title: 'Task 2',
                description: 'Complete task 2',
                scheduledDate: '2023-08-02',
                folder: 'folder2',
                completed: false,
            },
        ]);
    }, []);

    return (
        <div className="app-container">
            <h1>Welcome to Todo List App</h1>

            {/* Implement the Search feature */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a todo"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={searchTodo}>Search</button>
            </div>




            {/* Implement the Cards for Categories */}
            <div className="cards-container">
                <div className="card">
                    <h2>Today's Todo</h2>
                    <ul>
                        {filterTodayTodos().map((todo) => (
                            <li key={todo.id}>
                                {todo.title} - {todo.description}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card">
                    <h2>Scheduled Todo</h2>
                    <ul>
                        {filterScheduledTodos().map((todo) => (
                            <li key={todo.id}>
                                {todo.title} - {todo.description}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card">
                    <h2>All Todos</h2>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                {todo.title} - {todo.description}
                                {!todo.completed && (
                                    <button onClick={() => markTodoAsCompleted(todo.id)}>
                                        Mark as Completed
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card">
                    <h2>Completed Todos</h2>
                    <ul>
                        {completedTodos.map((todo) => (
                            <li key={todo.id}>
                                {todo.title} - {todo.description}
                            </li>
                        ))}
                    </ul>
                </div>


            </div>


            <button onClick={handleSignOut}>Sign Out</button>

            <div>
                <Link to="/addtodo" className="add-todo-link">Add New Todo</Link>
                <Link to="/addlist" className="add-list-link">Add New List</Link>
            </div>

        </div>
    );

};

export default App;
