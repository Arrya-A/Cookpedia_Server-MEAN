require("dotenv").config()
const express = require('express')
const cors = require('cors')
require('./config/connection')
const router = require('./routes/router')

const cookPediaServer=express()

cookPediaServer.use(cors())
cookPediaServer.use(express.json())
cookPediaServer.use(router)

const PORT =3000 || process.env.PORT

cookPediaServer.listen(PORT,()=>{
    console.log(`CookpediaServer started at port : ${PORT} and waiting for client request`);
    
})

cookPediaServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">Cookpedia Server Started and waiting for client request</h1>`)
})
