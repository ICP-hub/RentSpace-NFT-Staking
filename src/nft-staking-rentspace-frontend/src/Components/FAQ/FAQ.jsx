import React, { useState } from 'react'
import './FAQ.css'
import FAQ_Question from './FAQ_Question'

const FAQ = () => {

    const [FAQs, setFAQs]=useState([
        {'Question 1':'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, placeat tempore commodi reprehenderit obcaecati, quidem excepturi cumque fuga voluptatem dignissimos beatae error, aliquam libero non incidunt voluptates pariatur quibusdam odio!'},
        {'Question 2':'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, placeat tempore commodi reprehenderit obcaecati, quidem excepturi cumque fuga voluptatem dignissimos beatae error, aliquam libero non incidunt voluptates pariatur quibusdam odio!'},
        {'Question 3':'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, placeat tempore commodi reprehenderit obcaecati, quidem excepturi cumque fuga voluptatem dignissimos beatae error, aliquam libero non incidunt voluptates pariatur quibusdam odio!'},
        {'Question 4':'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, placeat tempore commodi reprehenderit obcaecati, quidem excepturi cumque fuga voluptatem dignissimos beatae error, aliquam libero non incidunt voluptates pariatur quibusdam odio!'},
        {'Question 5':'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, placeat tempore commodi reprehenderit obcaecati, quidem excepturi cumque fuga voluptatem dignissimos beatae error, aliquam libero non incidunt voluptates pariatur quibusdam odio!'},

    ])
  return (
    <div className='FAQ-mainCont no-scrollbar'>
         <h1 className='FAQ-heading'>FAQ</h1>
         <div className='FAQs-cont'>
            { FAQs.map((faq)=>{ return <FAQ_Question Question={Object.keys(faq)} Answer={faq[Object.keys(faq)]} /> } )}
            <div className='line'></div>
         </div>
         
    </div>
  )
}

export default FAQ