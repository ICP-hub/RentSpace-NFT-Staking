import React, { useState } from 'react'
import './FAQ.css'
import FAQ_Question from './FAQ_Question'

const FAQ = () => {

    const [FAQs, setFAQs]=useState([
        {'Q1. What is an NFT':'An NFT (Non-Fungible Token) is a unique digital asset that represents ownership or proof of authenticity of a specific item or piece of content on the blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum, which are fungible and can be exchanged one-for-one, NFTs are unique and cannot be exchanged on a like-for-like basis. They are often used for digital art, collectibles, virtual real estate, and more.'},
        {'Q2. How do NFTs work?':'NFTs are built on blockchain technology, primarily using Ethereum’s ERC-721 or ERC-1155 standards. Each NFT has a unique identifier and metadata that distinguish it from other tokens. This metadata can include information like the creator, ownership history, and a link to the digital asset (e.g., a digital artwork). When you buy an NFT, you are essentially purchasing a digital certificate of ownership for that asset.'},
        {'Q3. What can NFTs be used for?':'NFTs can be used for various purposes, such as Digital Art, Collectibles, Virtual Real Estates, Gaming, Music and Media, Domain Names and more.'},
        {'Q4. Are NFTs a good investment?':"NFTs can be a good investment for some, but they come with risks. The value of NFTs can be highly volatile and influenced by trends, the popularity of the creator, and market demand. It's important to do thorough research and consider the risks before investing. Like any investment, there are potential rewards and losses."},
        {'Q5. Can NFTs be transferred to others?':'Yes, NFTs can be transferred from one owner to another. This is done through the NFT marketplace or directly on the blockchain. When you transfer an NFT, the ownership records on the blockchain are updated to reflect the new owner.'},

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