// app.js

const express = require('express');
const cors = require('cors');
const toDoRoutes = require('./routes/ToDoRoutes');
const loginRoutes = require('./routes/LoginRoutes');
const registerRoutes = require('./routes/RegisterRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Include your routes here
app.use('/todos', toDoRoutes);
app.use('/auth', loginRoutes);
app.use('/auth', registerRoutes);

// Export the app for server.js to use
module.exports = app;
