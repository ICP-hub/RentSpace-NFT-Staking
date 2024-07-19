import { useEffect, useState } from "react";

export function NFTsData(){

const [NFTs,setNFTs] =useState( [
    {
        id: "1",
        metadata: {
          name: 'Minimalistic Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "2",
        metadata: {
          name: 'Minimalistic Villas#140',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "3",
        metadata: {
          name: 'Modernistic Villas#110',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "4",
        metadata: {
          name: 'Minimalistic Villas#165',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "5",
        metadata: {
          name: 'Minimalistic Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "6",
        metadata: {
          name: 'Futuristic Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {     id: "7",
        metadata: {
          name: 'Futuristic Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "8",
        metadata: {
          name: 'Minimalistic Villas#140',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "9",
        metadata: {
          name: 'Moon Villas#110',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "10",
        metadata: {
          name: 'Mars Villas#165',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "11",
        metadata: {
          name: 'Modernistic Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "12",
        metadata: {
          name: 'Moon Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {     id: "13",
        metadata: {
          name: 'Mars Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "14",
        metadata: {
          name: 'Minimalistic Villas#140',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "15",
        metadata: {
          name: 'Minimalistic Villas#110',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "16",
        metadata: {
          name: 'Modernistic Villas#165',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "17",
        metadata: {
          name: 'Moon Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: true,
        isImported: true,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
    {
        id: "18",
        metadata: {
          name: 'Minimalistic Villas#150',
          mimeType: 'image',
          url: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150.png',
          thumb: 'https://cf-assets.yuku.app/BatchMint/Minimalistic/150_thumb.png',
          description: 'This is the NFT from Minimalistic Villas collection',
          attributes: [
              {
                  trait_type: 'Uncommon',
                  value: 'Uncommon'
              }
          ]
      },
        isStaked: false,
        isImported: false,
        rarity: {
            Common: "Number",
            Uncommon: "Number",
            Rare: "Number",
            Epic: "Number",
            Legendary: "Number"
        },
        canisterID: "String",
        owner: "String",
        stakedAt: null
    },
  ])

  // useEffect(()=>{
  //   // console.log(NFTs)
  // },[NFTs])


  return {NFTs,setNFTs}
}


