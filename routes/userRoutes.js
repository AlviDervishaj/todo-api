const userController = require('../controllers/userController');

module.exports = app => {
    app
        .route('/user')
        // get a user
        .get(userController.getUser)
        // create a user
        .post(userController.createUser)
        // delete a user
        .delete(userController.deleteUser)
};