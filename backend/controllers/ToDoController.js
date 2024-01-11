const ToDoModel = require('../models/TodoModel');

module.exports.getToDo = async (req, res) => {
    const userid = req.params.id;

    try {
        const todos = await ToDoModel.find({ userid: userid });
        res.send(todos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports.saveToDo = async (req, res) => {
    const { text, userid } = req.body;

    try {
        const newToDo = await ToDoModel.create({ text, userid });
        console.log("Added:", newToDo);
        res.send(newToDo);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports.updateToDo = async (req, res) => {
    const { _id, text, userid } = req.body;

    try {
        await ToDoModel.findByIdAndUpdate({ _id, userid }, { text });
        res.send("Updated.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports.deleteToDo = async (req, res) => {
    const { _id, userid } = req.body;

    try {
        await ToDoModel.findOneAndDelete({ _id, userid });
        res.send("Deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
