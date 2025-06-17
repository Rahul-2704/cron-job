const express=require('express');
const dotenv=require('dotenv')
// require('./scheduler1.js')
require('./scheduler2.js')
dotenv.config();
const app=express();
app.use(express.json())

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})