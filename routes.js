const express  = require('express');
const { check, validationResult } = require('express-validator');


const routes = express.Router();

const UserController = require('./controllers/UserController');
const ContaController = require('./controllers/ContaController')
routes.post('/user/',UserController.create);
routes.post('/conta/',UserController.verifyJWT,ContaController.create);
routes.get('/conta/',UserController.verifyJWT,ContaController.listarTodas);
routes.post('/auth/', UserController.auth);
/*routes.get('/profile/', UserController.verifyJWT, UserController.profile)

routes.post('/conta/', UserController.verifyJWT, ContaController.create)
routes.get('/conta/', UserController.verifyJWT, ContaController.getAll)
routes.delete('/conta/:conta',  UserController.verifyJWT, ContaController.removeConta)*/

module.exports = routes