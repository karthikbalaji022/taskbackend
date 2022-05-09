import './App.css';
import React,{useState,useRef, useEffect} from 'react';
import Taskcard from './components/Taskcard';
import { createContext } from 'react';
import {v4 as uuid} from 'uuid'
import axios from 'axios'

export const cardDetail=createContext();

   function App() {
  
  
   const [tasks,SetTasks]=useState([]);
   useEffect(()=>{
    axios.get('/api/v1/tasks').then(res=>{
      SetTasks(res.data.task);
      return res;
    }).catch(e=>{
      console.log(e)
    })
   },[])
   const input=useRef();
   function addTask(){
     const text=input.current.value
     axios({
       method:'post',
       url:'/api/v1/tasks',
       data:{
         taskName:text,
         completed:false,
         delete:0
       }
     });
     
    axios.get('/api/v1/tasks').then(res=>{
      SetTasks(res.data.task);
      return res;
    }).catch(e=>{
      console.log(e)
    })
    }
    
  return (
    <div className="App">
     <div className='inputContainer'>
       <h1>Task Manager</h1>
       <div className='userInput'>
         <input type="text" name="task" className="userTask" placeholder="Enter task here" ref={input}/>
         <button type='submit' className='submitButton' onClick={addTask}>SUBMIT</button>
       </div>
       <div className='status'></div>
     </div>

     <cardDetail.Provider value={{tasks,SetTasks}}  >
     <div className='outerContainer'>

     {
       tasks.map((item,ind)=>{
         return <Taskcard item={item.taskName} key={item._id} id={item._id} strikeThrough={item.delete}/>
       })
     }
     </div>
    
     </cardDetail.Provider>
    </div>
  );
}
export default App;
