import react,{useContext,useRef,useState} from "react";
import { cardDetail } from "../App";
function Taskcard({item,id,strikeThrough}){
    const input=useRef()
    const {tasks,SetTasks}=useContext(cardDetail)
    const [editTrue,SetEdit]=useState(false);
    function remove(e){
        let prev=tasks.map((item)=>{
            if(item.id===id)
            {
                item.delete+=1;
            }
            return item;
        })
         prev=prev.filter((item)=>{
            console.log(item+" "+id)
            return item.delete<2
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
    const strike={
        textDecoration:"line-through"
    }
    return(
        <div className="taskCardContainer">
            <div className="card">{
                (strikeThrough==1 || (editTrue===false))?
                <input type="text" className="taskContent" value={item} style={strikeThrough==1? strike:{}} readOnly/>:
                <input type="text" className="taskContent" placeholder={item} ref={input} style={{border:"1px solid red"}} onChange={change}/>
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