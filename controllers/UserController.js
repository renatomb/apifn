const User = require('../models/user')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const secret_jwt = `${process.env.PORT}`
const salt = bcrypt.genSaltSync(10);

module.exports = {
   async create(req,res){        
      console.log(req);
      await check('password').exists().run(req);
      // Verificação de password e confirmação na api.
      //      await check('confirm').custom((value, { req }) => value === req.body.password).run(req);
      await check('email').exists().run(req);
      await check('email').custom(async function (value) {
         let userfind =  await User.find({email: value})
         if(userfind.length > 0){
            return res.status(422).json({ processado: false, mensagem: "Email ja cadastrado." });
         }
      }).withMessage('must be at least 5 chars long').run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }
      else {
         User.create({
            email: req.body.email,
            password:  bcrypt.hashSync(req.body.password, salt),
            created_at: Date()
         }).then(user =>  res.json(user));
         return res.status(200).json({ processado: true, mensagem: "Cadastrado com sucesso." });
      }
   },
   async auth(req, res){
      var jwt = require('jsonwebtoken');
      await check('email').exists().run(req);
      await check('password').exists().run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }
      let userfind = await User.find({email:req.body.email });
      if(userfind.length > 0 ){
         if( bcrypt.compareSync(req.body.password , userfind[0].password) ){
            let usuario = userfind[0];
            usuario['password'] = null;
            var token = jwt.sign({ usuario}, secret_jwt);
            res.status(200).json({ processado: true, mensagem: token });
         }
         else{
            res.status(422).json({processado: false, mensagem:"Senha invalida."});
         }
      }
      else{
         res.status(422).send({processado: false, mensagem: "E-mail inválido."});
      }
   },
   verifyJWT(req, res, next){
      console.log(req);
      var token = req.headers['token'];
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      jwt.verify(token, secret_jwt, function(err, decoded) {
         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
         req.userId = decoded.usuario._id;
         next();
      });
   },
   async profile(req,res){
      let userfind = await User.find({_id:req.userId},{password:0});
      res.json(userfind);
   }
}