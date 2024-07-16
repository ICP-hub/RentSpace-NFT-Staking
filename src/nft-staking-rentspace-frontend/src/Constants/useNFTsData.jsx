import { useEffect, useState } from "react";

export function NFTsData(){

const [NFTs,setNFTs] =useState( [
    { id: 1, name: 'Minimilistic World-1', img: 'minimilistic-Villa.png', desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 2, name: 'Minimilistic World-2', img: 'minimilistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 3, name: 'Minimilistic World-3', img: 'minimilistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 4, name: 'Minimilistic World-4', img: 'minimilistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 5, name: 'Modernistic World-1', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 6, name: 'Modernistic World-2', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 7, name: 'Modernistic World-3', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false},
    { id: 8, name: 'Modernistic World-4', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 9, name: 'Futuristic World-1', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250,staked: true },
    { id: 10, name: 'Futuristic World-2', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 11, name: 'Futuristic World-3', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 12, name: 'Futuristic World-4', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 13, name: 'Minimilistic World-5', img: 'minimilistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 14, name: 'Modernistic World-5', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 15, name: 'Minimilistic World-6', img: 'minimilistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 16, name: 'Moon World-1', img: 'Moon-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 17, name: 'Moon World-2', img: 'Moon-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 18, name: 'Moon World-3', img: 'Moon-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 19, name: 'Moon World-4', img: 'Moon-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 20, name: 'Mars World-1', img: 'Mars-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 21, name: 'Mars World-2', img: 'Mars-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 22, name: 'Mars World-3', img: 'Mars-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 24, name: 'Mars World-4', img: 'Mars-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 25, name: 'Futuristic World-5', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 26, name: 'Futuristic World-6', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false},
    { id: 27, name: 'Futuristic World-7', img: 'futuristic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 28, name: 'Mars World-5', img: 'Mars-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 29, name: 'Minimilistic World-7', img: 'minimilistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 30, name: 'Modernistic World-6', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },
    { id: 31, name: 'Modernistic World-7', img: 'modernistic-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false},
    { id: 32, name: 'Moon World-5', img: 'Moon-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: true },
    { id: 33, name: 'Moon World-6 ', img: 'Moon-Villa.png',desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, praesentium.',point:250, staked: false },

  ])

  // useEffect(()=>{
  //   // console.log(NFTs)
  // },[NFTs])


  return {NFTs,setNFTs}
}


