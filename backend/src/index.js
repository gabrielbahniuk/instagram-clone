require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const {
  dbUsername,
  dbPassword,
  dbServer,
  dbInstance
} = require('./config/database');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
);

mongoose.connect(
  `mongodb+srv://${dbUsername}:${dbPassword}@${dbServer}/${dbInstance}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  }
);

app.use(require('./routes'));

server.listen(3333);
