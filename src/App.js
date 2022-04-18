import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask";
import About from "./components/About";


function App() {
  const [showAddTask, setShowAddtask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()

      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  //Fetch data
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()

    return data
  }
  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    const data = await res.json()

    return data
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
    })

    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
      })
      const data = await res.json()
      setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) +1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)

    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => {
        return task.id ===id ? {...task, reminder: data.reminder}: task
      })
    )
  }
  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddtask(!showAddTask)} showAdd={showAddTask} />
     <Routes>
      <Route path="/" element={
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {
              tasks.length > 0 ? (<Tasks onToggle={toggleReminder} onDelete={deleteTask} tasks={tasks} />) : ('No tasks avaliable!')
            }
          </>
        }
        />  
        <Route path="/about" element={<About />}/>
     </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
