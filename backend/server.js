// const express= require('express')
// const mongoose= require('mongoose')

// const cors=require('cors')
// const routes=require('./routes/ToDoRoutes')
// require('dotenv').config()

// const app=express()
// const PORT=process.env.port || 5000
// app.use(express.json())
// app.use(cors())
// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(()=> console.log('Connected to Atlas.'))
//     .catch((err)=>console.log(err))
// app.use(routes)
// app.listen(PORT,()=> console.log(`Listening on ${PORT}`))


// server.js

const app = require('./app'); // Import the configured Express app from app.js
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to Atlas.');
        app.listen(PORT, () => console.log(`Listening on ${PORT}.`));
    })
    .catch((err) => console.error('Could not connect to MongoDB Atlas:', err));
