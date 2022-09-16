import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import Header from './components/Header'
import Layout from './components/Layout'
import Lists from './components/Lists'

const App = () => {
  const [error, setError] = useState(null)
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [edit, editTodos] = useState(null)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // const updateTodos = (title, id, completed) => {
  //   const newT = todos.map((todos) => {
  //     todos.id === id ? {title: todo, id, completed} : todos
  //   })
  //   setTodos(newT)
  //   editTodos(null)
  // }

  const submitHandler = (e) => {
    e.preventDefault()

    if (todo.length < 5) {
      setError('At least 5 word required!')
      return false
    }

    // setTodos([{ id: Date.now(), title: todo, done: false }, ...todos])
    //   editTodos(null)
    //   setTodo('')
    //   setError(null)

    if (!edit){
      setTodos([{ id: Date.now(), title: todo, done: false }, ...todos])
      editTodos(null)
      setTodo('')
      setError(null)
    } 
    // else {
    //   updateTodos(todo, edit.id, edit.completed)
    // }
    
  }

  const delHandler = (todoId) => {
    if (window.confirm('Are you sure?')) {
      const updatedTodos = todos.filter((item) => item.id !== todoId)

      setTodos(updatedTodos)
    }
  }

  const editHandler = (todoId)=>{
    const findTodo = todos.find((todo) => edit.id === todoId)
    editTodos(findTodo)
  }

  const doneHandler = (todoId) => {
    const index = todos.findIndex((emp) => emp.id === todoId)
    const newTodo = [...todos]

    newTodo[index] = {
      id: todos[index].id,
      title: todos[index].title,
      done: !todos[index].done,
    }

    setTodos(newTodo)
  }

  return (
    <Layout>
      <Header />
      <Form
        error={error}
        value={todo}
        submit={submitHandler}
        onChange={(e) => setTodo(e.target.value)}
      />
      <hr className='border-primary' />
      <Lists todos={todos} delHandler={delHandler} editHandler={editHandler} doneHandler={doneHandler} />
    </Layout>
  )
}

export default App
