const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method} ${req.path}`);
  next();
}


async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const users= await Users.getById(req.params.id);
    if (users) {
      req.users = users; // saves other middlewarws a db trip
      next();
    } else {
      next({ status: 404, message: 'not found!' });
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.name.trim()) {
    next({ status: 400, message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    next({ status: 400, message: "missing required name field" });
  } else {
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
module.exports = { errorHandling, logger,  validateUserId, validatePost }