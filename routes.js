const express  = require('express');
const { check, validationResult } = require('express-validator');


const routes = express.Router();

const UserController = require('./controllers/UserController');
const ContaController = require('./controllers/ContaController');
const CategoriaController = require('./controllers/CategoriaController');
const LancamentoController = require('./controllers/LancamentoController');
// Rotas de usuário
routes.post('/user/',UserController.create);
routes.post('/auth/', UserController.auth);
// Rotas de contas bancárias
routes.post('/conta/',UserController.verifyJWT,ContaController.create);
routes.get('/conta/',UserController.verifyJWT,ContaController.listarTodas);
// Rotas de categorias
routes.post('/categ/',UserController.verifyJWT,CategoriaController.create);
routes.get('/categ/',UserController.verifyJWT,CategoriaController.listarTodas);
// Rotas de lancamentos
routes.post('/debito/',UserController.verifyJWT,LancamentoController.debito);
routes.get('/debito/',UserController.verifyJWT,LancamentoController.listarDebitos);
routes.post('/credito/',UserController.verifyJWT,LancamentoController.credito);
routes.get('/credito/',UserController.verifyJWT,LancamentoController.listarCreditos);
/*
routes.delete('/conta/:conta',  UserController.verifyJWT, ContaController.removeConta)*/

module.exports = routes