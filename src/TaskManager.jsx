import React, { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList';
 import './TaskManager.css'
function TaskManager() {
  const [tasks,setTasks]=useState([])
  const[editingTask,setEditingTask]=useState(null);
  useEffect(()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
      setTasks(storedTasks);
    }
  },[]);
   function addTask(task){
      setTasks((prevTask)=>[
        ...prevTask,
        {...task,id:Date.now(),status:'Pending'}
      ])
   }
   function editTask(editedTask){
    setTasks((prevTask)=>
    prevTask.map((task)=>(task.id===editedTask.id ? editedTask : task))
    );
    setEditingTask(null);
   }
   function deleteTask(id){
    setTasks((prevTask)=>prevTask.filter((task)=>task.id !==id));
   }

   function changeTaskStatus(id,newStatus){
    setTasks((prevTask)=> prevTask.map((task)=>task.id===id ?{...task,status:newStatus}:task))
   }
   function handleEditClick(task){
    setEditingTask(task);
   }
 
    return (
    <div className="task-manager-container">
      <h1 className="app-header">Task Manager</h1>
      <div className="task-form-wrapper">
        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          editTask={editTask}
          setEditingTask={setEditingTask}
        />
      </div>
      <div className="task-list-wrapper">
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          handleEditClick={handleEditClick}
        />
      </div>
    </div>
  )
}

export default TaskManager
