import React, { useState } from 'react'
import "./Modal.css"
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Modal = ({status, message, openModal=false}) => {
  const [isModalOpen, setIsModalOpen] = useState(openModal);
  const error = status.toLowerCase() === 'error' ? true : false
  if(!isModalOpen) return
  setTimeout(()=> {
    setIsModalOpen(false)
  },3000)
  return (
    <div className='modal'>
      <h1 className='status'>{error? 'Oops, something went wrong!': 'Successful'}</h1>
    <div className={`symbol ${error ? 'error': 'success'}`}>
      {error ? <FaXmark size={20} color='#fff'/> :  <FaCheck size={20} color='#fff'/>}
    </div>
      <p className='message'>{message}</p>
      <button onClick={()=> setIsModalOpen(false)}>Go Back</button>
    </div>
  )
}

export default Modal