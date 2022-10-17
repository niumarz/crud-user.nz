import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'



const baseURL = 'https://users-crud1.herokuapp.com'



function App() {

  const [users, setUsers] = useState()

//esto es para pasar la info desde UserCar hasta FormUser
  const [updateInfo, setUpdateInfo] = useState()
  const [formIsClose, setformIsClose] = useState(false)
 

//para hacer el get de todos los users
  const getAllUser = ()=> {
    const URL = `${baseURL}/users/`
    axios.get(URL)
    .then( res => setUsers(res.data))
    .catch(err => console.log(err))
  }
  useEffect(() => {
  getAllUser()
  }, [])

  
//para crear un nuevo usuario 
const createNewUser = data => {
  const URL = `${baseURL}/users/`
  axios.post(URL, data)
  .then(res => {
    console.log(res.data)
    getAllUser()
  })
  .catch(err => console.log(err)) 
}
 
  
//para eliminar un usuario especifico
const deleteUserById = id => {
  const URL =`${baseURL}/users/${id}/`
  axios.delete(URL)
  .then(res => {
    console.log(res.data)
    getAllUser()
  })
  .catch(err => console.log(err)) 
}


//pra acutalizar un usuario en especifico
const updateUserById = (id, data) =>{
  const URL = `${baseURL}/users/${id}/`
  axios.patch(URL, data)
  .then(res =>{ 
    console.log(res.data)
    getAllUser()
})
  .catch(err => console.log(err))
}

const handleOpenForm = () => {
  setformIsClose(false)
}
  return (
    <div className="App">
      <div className='App_container-title'>
      <h1 className='App_title'>Users CRUD</h1>
      <button onClick={handleOpenForm} className='App_btn'>Create a New User</button>
      </div>
      <div className={`form-container ${formIsClose && 'disable_form'}`}>
      <FormUsers
        createNewUser={createNewUser}
        updateInfo={updateInfo}
        updateUserById={updateUserById}
        setUpdateInfo={setUpdateInfo}
        setformIsClose={setformIsClose}
      />
    </div>
      <div className='users-container'>
      {
      users?.map(user => (
        <UserCard
        key={user.id}
        user={user}
        deleteUserById={deleteUserById}
        setUdateInfo={setUpdateInfo} 
        setformIsClose={setformIsClose}
        />
        
      ))
      }
      </div>
    </div>
  )
}

export default App
 