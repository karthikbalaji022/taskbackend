const express=require('express');
const tasks=express.Router();
const {getAllTask,createTask,getTask,updateTask,deleteTask}=require('../routes/routes');
tasks.route('/').get(getAllTask).post(createTask);
tasks.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports=tasks;