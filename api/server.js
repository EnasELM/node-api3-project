const express = require('express');

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(express.json());

// global middlewares and the user's router need to be connected here

const usersRouter = require('./users/users-router.js');

// server.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});


module.exports = server;
