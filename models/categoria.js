const mdb = require('mongoose')

const CategoraiSchema = new mdb.Schema({
   name:String,
   UserId:String
})
module.exports = mdb.model('user', CategoraiSchema)