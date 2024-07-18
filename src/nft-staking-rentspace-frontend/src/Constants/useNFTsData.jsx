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
    {     id: "1",
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
    {     id: "1",
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


