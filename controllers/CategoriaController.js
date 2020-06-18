const categoria = require('../models/categoria')
const { check, validationResult } = require('express-validator');

module.exports = {
   async create(req,res){       
      console.log(req.userId);
      await check('nome').exists().run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ processado: false, mensagem: "Informe o nome da categoria." });
      }
      categoria.create({
         nome:req.body.nome,
         userId:req.userId
      }).then(resposta =>  res.status(200).json({ processado: true, mensagem: "Categoria cadastrada com sucesso."}))
      .catch(err => res.status(400).json({'error':'ocorreu um erro no cadastramento da conta'}))
   },
   async listarTodas(req,res){
      let categorias = await categoria.find({userId:req.userId})
      res.json(categorias)
      
  }
}