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
    email: "",
    profilePic: ""
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
    const { name, value, files } = e.target
    if (name === "profile") {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }))
      console.log(formData)

    }
    else {

      setFormData((prev) => ({ ...prev, [name]: value }))
    }

  }
  const handleFormSubmission = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("profile", formData.profilePic);
    const response = await addFormData(formDataToSend)
    console.log(response, "backend response")

  }

  return (
    <>
      <div>
        {jokes.map((joke) => (
          <p key={joke.id}>{joke.content}</p>
        ))}
      </div>
      <form onSubmit={handleFormSubmission} encType='multipart-form/data' >
        <label>Name</label>
        <input name='name' type='text' onChange={handleUserData} />
        <br /><br />
        <label>Email</label>
        <input name='email' type='email' onChange={handleUserData} />
        <input name='profile' type='file' onChange={handleUserData} />
        <button type='submit'>click</button>
      </form>

    </>
  )
}

export default App
