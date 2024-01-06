const ToDoModel= require('../models/TodoModel')

module.exports.getToDo = async (req, res) => {
    const userid = req.params.id;
    const sortByRecent = req.query.sortByRecent; // Get query parameter

    try {
      let query = ToDoModel.find({ userid: userid });
      if (sortByRecent === 'true') {
        query = query.sort({ createdAt: -1 }); // Sort by createdAt in descending order
      }
      const toDo = await query;
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
  