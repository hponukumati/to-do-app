import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";

function TodoApp() {
    const userid = localStorage.getItem('userId');
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/todos/${userid}`);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (input.trim()) {
            try {
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/todos', { text: input, userid });
                setTodos([...todos, response.data]);
                setInput('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const startEdit = (todo) => {
        setEditId(todo._id);
        setEditText(todo.text);
    };

    const updateTodo = async () => {
        if (editText.trim()) {
            try {
                await axios.put(import.meta.env.VITE_BACKEND_URL + '/todos', { _id: editId, text: editText, userid });
                const updatedTodos = todos.map(todo => todo._id === editId ? { ...todo, text: editText } : todo);
                setTodos(updatedTodos);
                setEditId(null);
                setEditText('');
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + '/todos', { data: { _id: id, userid } });
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-light-100 flex flex-col items-center pt-10"> {/* Adjusted background color */}
            <h1 className="text-2xl text-gray-800 font-bold mb-6">ToDo App</h1> {/* Adjusted text color and size */}
            <div className="flex w-full max-w-xl mx-auto px-4">
                <input
                    type="text"
                    className="flex-1 p-2 rounded-l bg-white text-gray-800 border border-gray-300" 
                    placeholder="Add ToDos..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600" 
                    onClick={addTodo}
                >
                    Add
                </button>
            </div>
            {todos.map((todo) => (
                <div key={todo._id} className="bg-white text-gray-800 p-4 rounded mt-2 flex justify-between items-center border border-gray-300 shadow-sm">
                        {editId === todo._id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 p-2 bg-gray-600 text-white"
                            />
                        ) : (
                            <span>{todo.text}</span>
                        )}
                        <div>
                            {editId === todo._id ? (
                                <button className="text-green-400 hover:text-green-300 mx-2" onClick={updateTodo}>
                                    Save
                                </button>
                            ) : (
                                <button className="text-blue-400 hover:text-blue-300 mx-2" onClick={() => startEdit(todo)}>
                                    Edit
                                </button>
                            )}
                            <button className="text-red-400 hover:text-red-300" onClick={() => deleteTodo(todo._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TodoApp;
