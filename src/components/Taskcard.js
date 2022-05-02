import react,{useContext,useRef,useState} from "react";
import { cardDetail } from "../App";
function Taskcard({item,id}){
    const input=useRef()
    const {tasks,SetTasks}=useContext(cardDetail)
    const [editTrue,SetEdit]=useState(false);
    function remove(e){
        let prev=tasks.filter((item)=>{
            console.log(item+" "+id)
            return item.id!=id
        })
        SetTasks(prev)
    }
    function edit(e){
        SetEdit((prev)=>{
            return !prev
        })
        
    }
    function change(e){
        let itemTemp=e.target.value
        let prev=tasks.map((it)=>{
            if(it.id===id)
            {
                it.text=itemTemp
            }
            return it;
        })
        SetTasks(prev)
    }
    return(
        <div className="taskCardContainer">
            <div className="card">{
                editTrue===false?
                <input type="text" className="taskContent" value={item} readOnly/>:
                <input type="text" className="taskContent" placeholder={item} ref={input} onChange={change}/>
            }
                <div className="buttonContainer">
                <button className="edit" name="edit" onClick={edit}>Edit</button>
                <button className="delete" name="delete" onClick={remove}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Taskcard