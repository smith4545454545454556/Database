import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { data } from './api/data'

function App() {
  const [jokes, setJokes] = useState([])
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
  return (
    <>
      <p>{jokes.length}</p>
      <div>
        {jokes.map((joke) => (
          <p key={joke.id}>{joke.content}</p>
        ))}
      </div>
      <form>
        <button onClick={handleClick}>click</button>
      </form>

    </>
  )
}

export default App
