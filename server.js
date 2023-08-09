const express = require('express');
const mongoose= require('mongoose');
const taskSchema = require('./model.js');
const cors=require('cors');

const app =express();
mongoose.connect('mongodb+srv://satya:satya401@cluster0.kike3w4.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log("DB Connected")
)
app.use(cors({
    origin : '*'
}))
app.use(express.json())
app.post('/addtask', async(req,res)=>{
    console.log("Hii");
    console.log(req.body);
    const {todo}= req.body;
    console.log(todo)
    try{
        const newData = new taskSchema({
            todo : todo
        })
       await newData.save();
       return res.json(await taskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})
app.get('/gettask', async(req,res) => {
    try{
        return res.json(await taskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})
app.delete('/delete/:id', async(req,res) =>{
    try{
        await taskSchema.findByIdAndDelete(req.params.id)
        return res.json(await taskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.patch('/update/:id', async(req,res) =>{
    try{
        console.log("IIIIDDD:",req.params.id,"DDAATTAA:",req.body);
        await taskSchema.findByIdAndUpdate({_id:req.params.id},{todo:req.body.todo})
        return res.json(await taskSchema.find())
        
    }
    catch(err){
        console.log(err)
    }
})
app.listen(5000, ()=> console.log('Server Running'));
