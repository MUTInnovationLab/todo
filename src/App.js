// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { db, auth } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';

// CSS styles
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#22c1c3] to-[#1a2274] via-[#2d65fd]`, 
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex flex-col`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-teal-600 text-slate-100`,
  count: `text-center p-2`,
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
};

// App component
function App() {
  const navigate = useNavigate(); // Use the useNavigate hook

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      alert('User not authenticated');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      email: user.email,
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const q = query(
          collection(db, 'todos'),
          where('email', '==', user.email)
        );
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          let todosArr = [];
          querySnapshot.forEach((doc) => {
            todosArr.push({ ...doc.data(), id: doc.id });
          });
          setTodos(todosArr);
        });
        return () => {
          unsubscribeSnapshot();
        };
      } else {
        setTodos([]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

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

    alert('Reminder set'); // Display "Reminder set" message as an alert
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo List</h3>

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
          {todos.map((todo) => (
            <Todo
              key={todo.id}
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
          <button onClick={handleLogout} className={style.button}>
          Logout
        </button>
      </div>
    </div>
    
  );
}

// Todo component
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
            className={todo.completed ? style.textComplete : style.text}
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
