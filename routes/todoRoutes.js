const todoController = require('../controllers/todoController');

module.exports = app => {
    app
        .route('/todo')
        // get all todos
        .get(todoController.getTodos)
        // post a todo
        .post(todoController.createTodo)
        // delete a todo
        .delete(todoController.deleteTodo)
        // update a todo
        .put(todoController.updateTodo)
};