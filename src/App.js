import './App.css';
import React,{useState,useRef,useEffect} from 'react';
import Taskcard from './components/Taskcard';
import { createContext } from 'react';
import {v4 as uuid} from 'uuid'
export const cardDetail=createContext();
function App() {
  const [tasks,SetTasks]=useState([]);
  const input=useRef();
 function addTask(){
  const text=input.current.value
  var prev=tasks.slice();
  if(text.length>0)prev.push({id:uuid(),text:text})  
input.current.value=""
   SetTasks(prev)
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
         return <Taskcard item={item.text} key={item.id} id={item.id}/>
       })
     }
     </div>
     </cardDetail.Provider>
    </div>
  );
}
export default App;
