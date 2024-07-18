import React from 'react'

const Modal = ({status, message}) => {
  return (
    <div className={`${status.toLowerCase === "error" ? 'error' : 'success'}`}>
      Modal
    </div>
  )
}

export default Modal