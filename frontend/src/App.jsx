import React from "react";
import Login from './components/Login';
import Home from './components/Home';
import TodoList from './components/TodoList';
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/my-todos" element={<TodoList />} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
