import React, { useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";

const FAQ_Question = ({Question, Answer}) => {
    const [isClicked, setClicked]= useState(false)

  return (
    <div className='FAQ-cont'>
        <div className='line'></div>
        <div className='Question-cont'>
            <h1> { Question } </h1>
           { !isClicked ? <FiPlus className='fi_Icon' size={30} onClick={()=>setClicked(true)}/>
            : 
           <FiMinus className='fi_Icon' size={30} onClick={()=>setClicked(false)}/>
           }
        </div>
        <p className={`FAQ-answer ${isClicked ? 'visible' : ''}`}>{Answer}</p>
    </div>
  )
}

export default FAQ_Question