import React, { useState } from 'react'

const FAQ_Question = ({Question, Answer}) => {
    const [isClicked, setClicked]= useState(false)
    function handleClicked(){
        setClicked((prev)=> !prev )
    }

  return (
    <div className='FAQ-cont'>
        <div className='line'></div>
        <div className='Question-cont'>
            <h1> { Question } </h1>
            <img onClick={handleClicked} src='plus.svg' />
        </div>
        { isClicked && <p className='FAQ-answer'> {Answer} </p> }
    </div>
  )
}

export default FAQ_Question