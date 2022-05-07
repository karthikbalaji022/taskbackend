const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    taskName:{
        type:String,
        required:[true,"Please enter task name"],
        trim:true
    },
    delete:{
        type:Number,
        default:0,
    },
    completed:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('Task',Schema)