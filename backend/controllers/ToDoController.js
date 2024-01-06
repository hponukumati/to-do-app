const ToDoModel= require('../models/TodoModel')

module.exports.getToDo = async (req, res) => {
    const userid = req.params.id; // Correctly access the 'id' parameter
    console.log(userid);
  
    try {
      const toDo = await ToDoModel.find({userid:userid}); // Assuming 'userId' is the field in your ToDoModel
      console.log(toDo);
      res.send(toDo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
 
  module.exports.saveToDo = async (req, res) => {
    const { text, userid } = req.body;
  
    ToDoModel.create({ text, userid })
      .then((data) => {
        console.log("Added.");
        console.log(data);
        res.send(data);
      })
      .catch((err) => console.log(err));
  };
  

  module.exports.updateToDo = async (req, res) => {
    const { _id, text, userid } = req.body;
  
    ToDoModel.findByIdAndUpdate({ _id, userid }, { text })
      .then(() => res.send("Updated."))
      .catch((err) => console.log(err));
  };
  

  module.exports.deleteToDo = async (req, res) => {
    const { _id, userid } = req.body;
  
    ToDoModel.findOneAndDelete({ _id, userid })
      .then(() => res.send("Deleted."))
      .catch((err) => console.log(err));
  };
  