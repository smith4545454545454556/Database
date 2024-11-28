import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addFormData, data } from './api/data'

function App() {
  const [jokes, setJokes] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })
  useEffect(() => {
    axios.get("/api/jokes").then((response) => {
      console.log(response, "response")
      setJokes(response.data)
    }).catch((error) => {
      console.log(error)
    })

  }, [])
  const handleClick = async (e) => {
    e.preventDefault()
    const response = await data()
    console.log(response.data, "the backend response")

  }
  const handleUserData = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

  }
  const handleFormSubmission = async (e) => {
    e.preventDefault()
    const response = await addFormData(formData)
    console.log(response, "backend response")

  }

  return (
    <>
      <p>{jokes.length}</p>
      <div>
        {jokes.map((joke) => (
          <p key={joke.id}>{joke.content}</p>
        ))}
      </div>
      <form onSubmit={handleFormSubmission}>
        <input name='name' type='text' onChange={handleUserData} />
        <input name='email' type='email' onChange={handleUserData} />
        <button type='submit'>click</button>
      </form>

    </>
  )
}

export default App
