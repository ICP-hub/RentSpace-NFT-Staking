import React from 'react'
import "./RegisterUser.css"

const RegisterUser = () => {
  function handleChange() {
    console.log("qb")
  }
  function registerNewUser() {
    console.log("qbregister")
  }
  function navigateToDashboard() {
    console.log("navigate")
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
                        <input type='text' onChange={handleChange} name='username' id='username' placeholder='Enter your username' />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' onChange={handleChange} id='email' name='email' placeholder='Enter your email' />
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