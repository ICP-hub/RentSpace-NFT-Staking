import {createContext, useState, useEffect, useContext} from 'react';
import {useAuth} from '../utils/useAuthClient';

const NFTContext = createContext({NFTData:[], setNFTData:()=>{}});

export default function NFTProvider({children}) {
    const {actors} = useAuth()
    const [NFTData, setNFTData] = useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const nfts = await actors.userActor.getAllUserImportedNFTs().then((res)=>{
                if(res.ok){
                    return res.ok
                }
                else {
                    return []
                }
            });
            console.log("imported : ",nfts)
            setNFTData(nfts)
        }
        fetchData()
    },[])
    return (
        <NFTContext.Provider value={{NFTData, setNFTData}}>
            {children}
        </NFTContext.Provider>
    )
}

export const useImportNFTData = ()=>{
    return useContext(NFTContext)
}

export const setNFTData = (data)=>{
    const {setNFTData} = useContext(NFTContext)
}