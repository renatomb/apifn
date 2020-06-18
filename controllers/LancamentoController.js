const lancamento = require('../models/lancamento')
const { check, validationResult } = require('express-validator');

module.exports = {
   async debito(req,res){       
      await check('data').exists().run(req);
      await check('contaId').exists().run(req);
      await check('categoriaId').exists().run(req);
      await check('valor').exists().run(req);
      await check('beneficiario').exists().run(req);
      await check('descricao').exists().run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ processado: false, mensagem: "Preencha todos os campos." });
      }
      lancamento.create({
         data:req.body.data,
         beneficiario:req.body.beneficiario,
         descricao:req.body.descricao,
         valor:-req.body.valor,
         contaId:req.body.contaId,
         categoriaId:req.body.categoriaId,
         userId:req.userId,
         created_at: Date()
      }).then(resposta =>  res.status(200).json({ processado: true, mensagem: "Despesa cadastrado com sucesso."}))
      .catch(err => res.status(400).json({processado: false, mensagem:"Ocorreu um erro no cadastramento da despesa"}))
   },
   async credito(req,res){       
      await check('data').exists().run(req);
      await check('contaId').exists().run(req);
      await check('categoriaId').exists().run(req);
      await check('valor').exists().run(req);
      await check('beneficiario').exists().run(req);
      await check('descricao').exists().run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ processado: false, mensagem: "Preencha todos os campos." });
      }
      lancamento.create({
         data:req.body.data,
         beneficiario:req.body.beneficiario,
         descricao:req.body.descricao,
         valor:req.body.valor,
         contaId:req.body.contaId,
         categoriaId:req.body.categoriaId,
         userId:req.userId,
         created_at: Date()
      }).then(resposta =>  res.status(200).json({ processado: true, mensagem: "Receita cadastrada com sucesso."}))
      .catch(err => res.status(400).json({processado: false, mensagem:"Ocorreu um erro no cadastramento da receita."}))
   },
   async listarDebitos(req,res){
      let debitos = await lancamento.find({userId:req.userId,valor:{$lt:0}})
      res.json(debitos);
   },
   async listarCreditos(req,res){
      let creditos = await lancamento.find({userId:req.userId,valor:{$gt:0}})
      res.json(creditos);
   }
}