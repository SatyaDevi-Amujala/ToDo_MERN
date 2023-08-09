import React, {useEffect,useState} from 'react';

import axios from 'axios';
import './index.css';


const App = () => {
  const [item,setItem]=useState([]);
  const [task, setTask]=useState('');
  const [id,setId]=useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/gettask').then(
      arr =>setItem(arr.data)
    )
  },[])
  const submitHandler= e =>{
    e.preventDefault();
    if(id==''){
    axios.post('http://localhost:5000/addtask',{todo:task}).then(
      arr => setItem(arr.data)
    )
    setTask('');}
  }
 
  const updateHandler=id =>{
    console.log("TTTAASSKK:",task,id)
    axios.patch(`http://localhost:5000/update/${id}`,{todo:task}).then(
      arr => {console.log("DataUpdated");
        setItem(arr.data)
      setId('')
      setTask('');}
    )
  }

  const editHandler= (id,data)=>{
    console.log("id and data:",id,data);
    setTask(data);
    setId(id);
  }
  const deleteHandler=id =>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr => setItem(arr.data)
    ); setId('');
  }
  return (
    <div class="cen">
      <h1>ToDo List</h1>
     
      <form className="container" onSubmit={submitHandler}>
        <div className="al row">
          <div className=" col-auto my-1 w-50">
    <input className="form-control"type="text"  placeholder="Add ToDo..."value={task} 
        onChange={(e) => setTask(e.target.value)}/></div>
        <div className=" col-auto my-1"> {id==''?
       <input className="btn btn-primary" type="submit" value="submit" />:
        <button className="btn btn-primary"onClick={()=>updateHandler(id)} >Update</button> }</div></div>

      </form> 
      {item.map(task => <div key={task._id}>
       
        <div className='form-control w-50 al1'><h4><span >{task.todo}</span>
       <button className="btn btn-danger gap" onClick={()=>deleteHandler(task._id)}>delete</button>
       <button  className="btn btn-secondary gap"onClick={()=>editHandler(task._id,task.todo)}>Edit</button> </h4>
        </div>
        </div>)}
      
    </div>
  )
}

export default App

