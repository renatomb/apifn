const mdb = require('mongoose')

const UserScheema = new mdb.Schema({
    name:String,
    password:String,
    username:String,
    created_at:Date
})
module.exports = mdb.model('user', UserScheema)