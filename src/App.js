import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex flex-col`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      description: description,
      date: date,
      time: time,
      completed: false,
    });
    setInput('');
    setDescription('');
    setDate('');
    setTime('');
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  // Set reminder
  const setReminder = (todo) => {
    const reminderDate = new Date(todo.date + 'T' + todo.time);
    const currentDate = new Date();

    if (currentDate >= reminderDate) {
      alert('It is time for: ' + todo.text);
    } else {
      const timeDifference = reminderDate - currentDate;
      setTimeout(() => {
        alert('It is time for: ' + todo.text);
      }, timeDifference);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Description"
          />
          <div className={style.row}>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={style.input}
              type="date"
            />
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={style.input}
              type="time"
            />
          </div>
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              setReminder={setReminder}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

const Todo = ({ todo, toggleComplete, deleteTodo, setReminder }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? 'checked' : ''}
        />
        <div>
          <p
            onClick={() => toggleComplete(todo)}
            className={
              todo.completed ? style.textComplete : style.text
            }
          >
            {todo.text}
          </p>
          <p>{todo.description}</p>
          <p>
            {todo.date} at {todo.time}
          </p>
        </div>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>
        <FaRegTrashAlt />
      </button>
      <button onClick={() => setReminder(todo)}>Set Reminder</button>
    </li>
  );
};

export default App;
