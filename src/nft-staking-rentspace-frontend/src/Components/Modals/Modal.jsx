import React from 'react'
import "./Modal.css"
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { createPortal } from 'react-dom';

const Modal = ({ status, message, closeModal }) => {
  const error = status.toLowerCase() === 'error' ? true : false

  return createPortal(
    <dialog className='modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      <h1 className='status'>{error ? 'Oops, something went wrong!' : 'Successful'}</h1>
      <div className={`symbol ${error ? 'error' : 'success'}`}>
        {error ? <FaXmark size={20} color='#fff' /> : <FaCheck size={20} color='#fff' />}
      </div>
      <p className='message'>{message}</p>
      <button className='modal-btn' onClick={() => closeModal(false)}>Go Back</button>
    </dialog>,
    document.getElementById('root')
  )
}

export default Modal