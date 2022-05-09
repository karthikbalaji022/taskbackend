import react,{useContext,useRef,useState} from "react";
import { cardDetail } from "../App";
import axios from "axios";
function Taskcard({item,id,strikeThrough}){
    const input=useRef()
    const {tasks,SetTasks}=useContext(cardDetail)
    const [editTrue,SetEdit]=useState(false);
    function remove(e){
        const curData=axios({
            method:'get',
            url:`/api/v1/tasks/${id}`
        }).then(res=>{
            const retData=res.data;
            if(retData.delete==1)
            {
                axios({
                    method:'delete',
                    url:`/api/v1/tasks/${id}`
                })
                axios.get('/api/v1/tasks').then(res=>{
                    SetTasks(res.data.task);
                    return res;
                  }).catch(e=>{
                    console.log(e)
                  })
            }else{
                axios({
                    method:'patch',
                    url:`/api/v1/tasks/${id}`,
                    data:{
                        ...retData,
                        delete:1
                    }
                })
                axios.get('/api/v1/tasks').then(res=>{
                    SetTasks(res.data.task);
                    return res;
                  }).catch(e=>{
                    console.log(e)
                  })
            }
            
        });
        // SetTasks(prev)
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