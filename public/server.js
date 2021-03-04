const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.Task = require('../models/todoModel');
global.Task = require('../models/userModel');
const todoRoutes = require('../routes/todoRoutes');
const userRoutes = require('../routes/userRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
// Set this url as a MONGO_URI variable in heroku
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true,  useUnifiedTopology: true }
);
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

todoRoutes(app);
userRoutes(app);

app.listen(port);

// Handle Production 
if(process.env.NODE_ENV === 'production'){
  // Set Static Folder
  app.use(express.static(__dirname));

  // Handle SPA
  // Removed /public from route below
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
  });
}

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`Server started on port ${port}`);