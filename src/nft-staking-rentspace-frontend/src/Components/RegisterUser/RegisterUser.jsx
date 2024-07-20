import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../utils/useAuthClient'
import {addUserData} from '../../utils/Redux-Config/UserSlice'
import {useDispatch} from 'react-redux'
import "./RegisterUser.css"

const RegisterUser = () => {
  const [formValue, setFormValue] = useState({username : '', email : ''})
  const navigate = useNavigate()
  const {actors} = useAuth()
  const dispatch = useDispatch()

  function handleChange(e) {
    const value = e.target
    setFormValue({
      ...formValue,
      [value.name]: value.value
    })
  }

  async function registerNewUser() {
    const backendActor = (actors?.userActor == undefined) ? r : actors?.userActor;
    const data = {name: formValue.username, email: formValue.email}
    console.log(data)
    const createUser = await backendActor.createUser(data)
    console.log("Response : ", createUser)
    if(createUser.err) {
      console.log("Error in creating user")
    }
    else {
      dispatch(addUserData(createUser.ok))
      navigate('/Dashboard')
    }
  }
  async function navigateToDashboard(e) {
    e.preventDefault()
    await registerNewUser()
  }

  return (
    <div className='RegisterPage-container'>
            <div className='form-content'>
                <div className='heading-cont'>
                    <h1>Register to Rent Space</h1>
                </div>
                <form className='form-container' onSubmit={navigateToDashboard}>
                    <div className='form-field'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' onChange={handleChange} value={formValue.username} name='username' id='username' placeholder='Enter your username' />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' onChange={handleChange} id='email' name='email' value={formValue.email} placeholder='Enter your email' />
                    </div>
                    <div className='form-field'>
                        <button type='submit' onClick={registerNewUser}>Signup</button>
                    </div>
                    {/* {error && <p className="error-message">{error}</p>} */}
                </form>
                {/* <div className='existing-wallet-text'>
                    <p onClick={navigateToHome}>I already have a wallet</p>
                </div> */}
            </div>
        </div>
  )
}

export default RegisterUser