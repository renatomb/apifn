const mdb = require('mongoose')

const LancamentoScheema = new mdb.Schema({
   data:Date,
   beneficiario:String,
   descricao:String,
   valor:Number,
   created_at:Date,
   contaId:String,
   categoriaId:String,
   userId:String
})
module.exports = mdb.model('lancamentos', LancamentoScheema)