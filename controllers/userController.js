const mongoose = require('mongoose');
const users = mongoose.model('Users');

exports.getUser = (req, res) => {
    console.log(req.query);
    users.find({
        username: req.query.username
    }, (err, users) => {
        if (err) res.send(err);
        res.json(users);
    });
};

exports.createUser = (req, res) => {
    const newUser = new users(req.body);
    newUser.save((err, newUser) => {
        if (err) res.status(300).send({
            error: err
        });
        res.json(newUser);
    });
};

exports.deleteUser = (req, res) => {
    users.deleteOne({
        _id: req.body.id
    }, err => {
        if (err) res.status(500).send({
            error: err
        });
        res.json({
            message: 'User successfully deleted',
            _id: req.params.userId
        });
    });
};