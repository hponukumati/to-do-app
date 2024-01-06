import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../AuthContext'; // Make sure this path is correct

function TodoList() {
    const [todos, setTodos] = useState([]);
    const { auth } = useContext(AuthContext); // Use AuthContext
    const userId = auth.userId; // Retrieve userId from AuthContext

    useEffect(() => {
        if (userId) {
            fetchToDos();
        }
    }, [userId]);

    const fetchToDos = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/${userId}`)
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error:', error));
    };

    const handleDelete = (todoId) => {
        fetch(import.meta.env.VITE_BACKEND_URL+`/todos/del`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: todoId, userid: userId })
        }).then(() => {
            setTodos(todos.filter(todo => todo._id !== todoId)); // Optimistically remove the todo from the state
        }).catch(error => console.error('Error:', error));
    };

    const handleUpdate = (todoId, newText) => {
        // Here you'd want to collect `newText` from the user
        // This is a placeholder for the update operation
        fetch(import.meta.env.VITE_BACKEND_URL+`/todos/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: todoId, text: newText, userid: userId })
        }).then(() => {
            fetchToDos(); // Re-fetch todos or optimistically update the state
        }).catch(error => console.error('Error:', error));
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-xl mx-auto">
                    {todos.map(todo => (
                        <div key={todo._id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                            <span className="text-gray-800 text-lg">{todo.text}</span>
                            <div>
                                <button 
                                    onClick={() => handleUpdate(todo._id, 'New Text Here')}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => handleDelete(todo._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TodoList;