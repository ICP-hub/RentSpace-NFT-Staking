import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/useAuthClient'
import { addUserData } from '../../utils/Redux-Config/UserSlice'
import { useDispatch } from 'react-redux'
import IMGComp from '../IMGComp'
import "./RegisterUser.css"

const RegisterUser = () => {
  const [formValue, setFormValue] = useState({ username: '', email: '' })
  const [errors, setErrors] = useState({ username: '', email: '' });
  const [isFormValid, setIsFormValid] = useState(false)
  const navigate = useNavigate()
  const { actors } = useAuth()
  const dispatch = useDispatch()
  const newErrors = { username: '', email: '' }

  //Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      return 'Invalid email address'
    }
    return ''
  }

  const validateUsername = (username) => {
    if (username.length > 50) {
      return 'Username must be 50 characters or less'
    } else if (!usernameRegex.test(username)) {
      return 'Username can only contain letters and numbers'
    } else if (isURL(username)) {
      return 'Username cannot be a URL'
    } else if (emailRegex.test(username)) {
      return 'Username cannot be an email address'
    }
    return ''
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) })
    } else if (name === 'username') {
      setErrors({ ...errors, username: validateUsername(value) })
    }
  }

  const validateForm = () => {
    const emailError = validateEmail(formValue.email)
    const usernameError = validateUsername(formValue.username)
    setErrors({ email: emailError, username: usernameError })
    return !emailError && !usernameError
  }

  async function registerNewUser() {
    const backendActor = actors?.userActor;
    const data = { name: formValue.username, email: formValue.email }
    console.log(data)
    const createUser = await backendActor.createUser(data)
    console.log("Response : ", createUser)
    if (createUser.err) {
      console.log("Error in creating user")
    }
    else {
      dispatch(addUserData(createUser.ok))
      navigate('/Dashboard')
    }
  }
  async function navigateToDashboard(e) {
    e.preventDefault()
    if (validateForm()) {
      await registerNewUser()
    }
  }

  return (
    <div className='RegisterPage-container'>
      < IMGComp src='Assets/BackgroundIMG.png' hashVal="LcEzJw9Gsqt5.AIVs.agD+xaRjWC" className='myWorld-bg' height='' width='' />
      <div className='form-content'>
        <div className='heading-cont'>
          <h1>Register to Rent Space</h1>
        </div>
        <form className='form-container' onSubmit={navigateToDashboard}>
          <div className='form-field'>
            <label htmlFor='username'>Username</label>
            <input type='text' onChange={handleChange} onBlur={handleBlur} value={formValue.username} name='username' id='username' placeholder='John Doe' className={errors.username ? 'input-error' : ''} />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input type='email' onChange={handleChange} onBlur={handleBlur} id='email' name='email' value={formValue.email} placeholder='johndoe@example.com' className={errors.email ? 'input-error' : ''} />
            {errors.email && <p className='error-message'>{errors.email}</p>}
          </div>
          <div className='form-field'>
            <button type='submit' onClick={navigateToDashboard}>Signup</button>
          </div>
        </form>
        {/* <div className='existing-wallet-text'>
                    <p onClick={navigateToHome}>I already have a wallet</p>
                </div> */}
      </div>
    </div>
  )
}

export default RegisterUser