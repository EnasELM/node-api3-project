const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.originalUrl}`);
  next();
}


async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user; // saves other middlewarws a db trip
      next();
    } else {
     res.status(404).json( {message: 'user not found' }) ;
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name|| !name.trim()) {
    res.status(400).json({message: "missing required name field" })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({message: "missing required text field" })
    
  } else {
    req.text = text.trim()
    next();
  }
}
function errorHandling(err, req, res, next) { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `Horror in the router: ${err.message}`,
    stack: err.stack,
  });
}

// do not forget to expose these functions to other modules
module.exports = { errorHandling, logger,  validateUserId,validateUser, validatePost }