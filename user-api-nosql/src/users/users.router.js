const UserController = require('./users.controller');
const { Router } = require('express');

// var typeorm = require("typeorm"); 
// var EntitySchema = typeorm.EntitySchema; 


// connection = typeorm.createConnection({ 
//    "type": "mongodb", 
//    "host": process.env.DATABASE_HOST, 
//    "port": process.env.DATABASE_PORT, 
//    "username": process.env.DATABASE_USERNAME, 
//    "password": process.env.DATABASE_PASSWORD, 
//    "database": process.env.DATABASE_NAME,
//    "useUnifiedTopology": true,
//    "useNewUrlParser": true,
//    "synchronize": false,
//    "logging": false, 
//    entities: [ new EntitySchema(require("../entity/user.json")) 
//    ] 
// });

const userController = UserController();

const router = Router();

router.get('/users/healthcheck', (req, res) => { 
   /* #swagger.tags = ['Users'] */
   return res.status(200).json({ "Status": "Healthy"})});
   
router.post('/users', userController.createUser

   /* #swagger.tags = ['Users']
      #swagger.parameters['obj'] = {
      in: 'body',
      description: 'User object',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/User" }
   } */

);
router.get('/users/:id', userController.getUserById

   /*	#swagger.tags = ['Users']
      #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true
   } */

);
router.get('/users', userController.getAllUsers
   /* #swagger.tags = ['Users'] */
);
router.put('/users/:id', userController.updateUser

   /*	#swagger.tags = ['Users']
      #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true
   } */

   /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'User object',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/User" }
   } */

);
router.delete('/users/:id', userController.deleteUser

   /*	#swagger.tags = ['Users']
      #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true
   } */

);

module.exports = router; 

