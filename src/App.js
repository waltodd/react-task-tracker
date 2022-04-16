import { useState } from "react";
import Header from "./components/Header";
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask";


function App() {
  const [tasks, setTasks] = useState([
    {
      id:1,
      text:'Doctors Appoiment',
      day:'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id:2,
      text:'Meeting at School',
      day:'Feb 6th at 1:30pm',
      reminder: true
    },
    {
      id:3,
      text:'Food shopping',
      day:'Feb 5th at 2:30pm',
      reminder: false
    }
  ])

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) +1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id ===id ? {...task, reminder: !task.reminder}: task
      })
    )
  }
  return (
    <div className="container">
      <Header />
      <AddTask onAdd={addTask} />
      {
        tasks.length > 0 ? (<Tasks onToggle={toggleReminder} onDelete={deleteTask} tasks={tasks} />) : ('No tasks avaliable!')
      }
    </div>
  );
}

export default App;
