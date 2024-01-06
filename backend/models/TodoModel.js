const mongoose=require('mongoose')

const todoSchema= new mongoose.Schema({
    text:{
        type: String,
        require:true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of your user model
        required: true
      }
})

module.exports=mongoose.model('ToDo', todoSchema)