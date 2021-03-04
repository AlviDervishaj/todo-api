const mongoose = require('mongoose');
const todos = mongoose.model('Todos');

exports.getTodos = (req, res) => {
    const user_id = req.query.userId
    todos.find({
        userId: user_id
    }, (err, todos) => {
        if (err) res.send(err);
        res.json(todos);
    });
};

exports.createTodo = (req, res) => {
    const newTodo = new todos(req.body)

    newTodo.save((err, newTodo) => {
        if (err) res.status(300).send({
            error: err
        });
        res.json(newTodo);
    });
};

exports.deleteTodo = (req, res) => {
    if(req.body.method == "one" && req.body.userId && req.body.id){
        todos.deleteOne({
            _id: req.body.id,
            userId: req.body.userId
        }, err => {
            if (err) res.status(500).send({
                error: err
            });
            res.json({
                message: 'Todo successfully deleted'
            });
        });
    }
    else if(req.body.method == "all" && req.body.userId) {
        todos.deleteMany({
            userId: req.body.userId
        },err => {
            if (err) res.status(500).send({
                error: err
            });
            res.json({
                message: 'Todos successfully deleted',
                _id: req.params.todoId
            });
        });
    }
};

exports.updateTodo = (req, res) => {
    const id = req.body.id;
    const finished = req.body.finished;
    todos.updateOne({ _id: id }, {
        $set: {
            finished: !finished
        }
    }, err => {
        if (err) res.status(500).send({
            error: err
        });
        res.json({
            message: 'Todo successfully updated',
            _id: req.params.todoId
        });
    });
};
