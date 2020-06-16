const dotenv=require("dotenv-safe");
const express=require("express");
const mongo=require("mongoose");
const app = express();
dotenv.config();

app.use(express.json());
mongo.connect(process.env.MONGOCONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true });

app.get(`/`, (req, res)=>{
   return res.json({'Hello':'world'})
});

app.listen(process.env.PORT);