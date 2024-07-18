import React from 'react'
import "./Modal.css"
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Modal = ({status, message}) => {
  const navigate = useNavigate();
  const error = status.toLowerCase() === 'error' ? true : false
  return (
    <div className='modal'>
      <h1 className='status'>{error? 'Oops, something went wrong!': 'Successful'}</h1>
    <div className={`symbol ${error ? 'error': 'success'}`}>
      {error ? <FaXmark size={20} color='#fff'/> :  <FaCheck size={20} color='#fff'/>}
    </div>
      <p className='message'>{message}</p>
      <button onClick={()=> navigate(-1)}>Go Back</button>
    </div>
  )
}

export default Modal