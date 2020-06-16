const mdb = require('mongoose')

const ContaScheema = new mdb.Schema({
    nome:String,
    banco_nome:String,
    banco_code:Number,
    numero:Number,
    created_at:Date,
    userId:String
})
module.exports = mdb.model('contas', ContaScheema)