const mdb = require('mongoose')

const CategoraiSchema = new mdb.Schema({
   nome:String,
   userId:String
})
module.exports = mdb.model('categorias', CategoraiSchema)