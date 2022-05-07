const Task=require('../models/tasks')

const getAllTask=async (req,res,next)=>{
    try{
        const task=await Task.find({})
        res.status(200).json(task)
    }catch(err){
        res.json(err)
    }
}
const createTask= async (req,res,next)=>{
    try{
        const task=await Task.create(req.body)
        res.json(task)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}

const getTask=async (req,res,next)=>{
    try{
        const task=await Task.findOne({taskName:req.params.id})
        res.status(200).json(task)
    }catch(err){
        res.status(500).json(err);
    }
}

const updateTask= async (req,res,next)=>{
    
    try{
        const {id:taskId}=req.params;
        const data=await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true,
        })
        if(data)
        {
            
            res.status(200).json(data)
        }else{
            throw data
        }
    }catch(err){
        res.status(404).json({err})
    }
}

const deleteTask=async (req,res,next)=>{
    try {
        const task=await Task.findOneAndDelete({_id:req.params.id})
        if(task)
        {
            res.status(200).json({msg:"deleted bro!!"})
        }else{
            res.status(404).json({msg:"id not found"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
module.exports={getAllTask,createTask,getTask,updateTask,deleteTask}