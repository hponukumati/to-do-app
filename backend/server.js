const express= require('express')
const mongoose= require('mongoose')
const routes=require('./routes/ToDoRoutes')
require('dotenv').config()

const app=express()
const PORT=process.env.port || 5000
mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> console.log('Connected to Atlas.'))
    .catch((err)=>console.log(err))
app.use(routes)
app.listen(PORT,()=> console.log(`Listening on ${PORT}`))