const mdb = require('mongoose')

const UserScheema = new mdb.Schema({
    email:String,
    password:String,
    created_at:Date
})
module.exports = mdb.model('user', UserScheema)