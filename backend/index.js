const express=require('express');
const app=express();
const tasks=require('./controllers/tasks');
const connectDB=require('./db/connect')
require('dotenv').config()

app.use(express.json())
app.get("/",(req,res)=>{
    res.status(200).send("Hello world from outside task")
})
app.use('/api/v1/tasks',tasks);

const start= async ()=>{
try{
    await connectDB(process.env.MONGO_URI)
    app.listen(9000,console.log("server is running"))
}catch(err){
console.log(`Something went wrong ${err}`)
}
}
start()