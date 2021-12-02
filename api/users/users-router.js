const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { errorHandling,   validateUserId, validatePost, validateUser } = require('../middleware/middleware')
const Users = require('./users-model.js');
const Poste = require('../posts/posts-model')

const router = express.Router();

router.get('/', errorHandling,  (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    next(error);
  });

});

router.get('/:id',  validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    next(error);
  });

});



router.post('/', validateUser,  (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert ({ name: req.name })
    .then(message => {
      res.status(201).json(message);
    })
    .catch(next);
});

router.put('/:id',validateUserId, validateUser,  (req, res, next) => {
 Users.update(req.params.id, {name: req.name})
   .then(() => {
     return Users.getById( req.params.id)
   })
   .then(user => {
     res.json(user)
   })
   .catch(next)
 
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
  .then(count => {
    res.json(req.user);
  })
  .catch(error => {
    next(error);
  });
});



router.get('/:id/posts',validateUserId,  async (req, res, next) => {
  try {
    const result  = await Users.getUserPosts(req.params.id)
    res.json(result)
  
  }catch (err){
    next(err)
  }
  
});

router.post('/:id/posts',validateUserId, validatePost, async (req, res, next) => {
 try{
   const result = await Poste.insert({
     user_id: req.params.id,
     text: req.text,
   })
   res.status(201).json(result)
 }catch (err){
  next(err)
 }
 
});

router.use(errorHandling);
// do not forget to export the router
module.exports = router;