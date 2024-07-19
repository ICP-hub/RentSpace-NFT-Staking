import React, { useState } from 'react'
import "./Modal.css"
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Modal = ({status, message, closeModal}) => {
  const error = status.toLowerCase() === 'error' ? true : false
  return (
    <div className='modal'>
      <h1 className='status'>{error? 'Oops, something went wrong!': 'Successful'}</h1>
    <div className={`symbol ${error ? 'error': 'success'}`}>
      {error ? <FaXmark size={20} color='#fff'/> :  <FaCheck size={20} color='#fff'/>}
    </div>
      <p className='message'>{message}</p>
      <button onClick={()=> closeModal}>Go Back</button>
    </div>
  )
}

export default Modal