const conta = require('../models/conta')
const { check, validationResult } = require('express-validator');

module.exports = {
   async create(req,res){          
      await check('nome').exists().run(req);
      await check('banco_nome').exists().run(req);
      await check('banco_code').exists().run(req);
      await check('numero').exists().run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ processado: false, mensagem: "Erro na validacao dos dados, preencha todos os campos." });
      }
      conta.create({
         nome:req.body.nome,
         banco_nome:req.body.banco_nome,
         banco_code:req.body.banco_code,
         numero:req.body.numero,
         userId:req.userId,
         created_at: Date()
      }).then(resposta =>  res.status(200).json({ processado: true, mensagem: "Conta cadastrada com sucesso."}))
      .catch(err => res.status(400).json({processado:false, mensagem:"Ocorreu um erro no cadastramento da conta."}))
   },
   async listarTodas(req,res){
      let contas = await conta.find({userId:req.userId})
      res.json(contas)
      
  }
}