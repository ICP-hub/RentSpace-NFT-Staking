import React, {useState, useMemo, useEffect} from "react";
import "./Worlds.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {nft_staking_rentspace_backend as actors} from "../../../../declarations/nft-staking-rentspace-backend/index.js";
import { NFTsData } from "../../Constants/useNFTsData";
import Card from "../Card/Card";
import {formatMetadata} from "../../utils/utils";
import { FaAngleLeft } from "react-icons/fa6";

const World = () => {
  const { world } = useParams();
  console.log(actors)

  const [NFTs,setNFTs] = useState([])

  useEffect(()=>{
    const getNFTs = async () => {
      let NFTs = await actors.getAllStaked();
      // Map over the array and use function formatMetadat on metadata field of each element
      NFTs = NFTs.map((NFT) => {
        NFT.metadata = formatMetadata(NFT.metadata);
        return NFT;
      });
      console.log("NFTs : ", NFTs);
      setNFTs(NFTs);
    };
    getNFTs();
  },[actors])

  const worldName = world.split("-").join(" ");
  const filteredWorlds = useMemo(()=>{
    return NFTs.filter((data) =>
      data.metadata.name
        .toLocaleLowerCase()
        .includes(worldName.split(" ")[0].toLowerCase())
    );
  }, [NFTs, worldName])
  const navigate = useNavigate();
  return (
    <div className="min-world-MainCont"  style={{ backgroundImage: "url('Assets/BackgroundIMG.png')" }}>
      <div className="min-world-InnerCont">
        <div className="worlds-navCont">
          <div className="world-innerCont">
            <div className="staking">
              <FaAngleLeft size={18}  className="backIcon" onClick={() => navigate('/myWorlds')} />
              <div className="staking-header">Staking</div>
            </div>

            <div className="world-links">
              <NavLink
                to={"/world/minimalistic-World"}
                className={"worlds-nav"}
              >
                Minimalistic World
              </NavLink>
              <NavLink to={"/world/modernistic-World"} className={"worlds-nav"}>
                Modernistic World
              </NavLink>
              <NavLink to={"/world/futuristic-World"} className={"worlds-nav"}>
                Futuristic World
              </NavLink>
              <NavLink to={"/world/moon-World"} className={"worlds-nav"}>
                Moon World
              </NavLink>
              <NavLink to={"/world/mars-World"} className={"worlds-nav"}>
                Mars World
              </NavLink>
            </div>
          </div>
        </div>
        <div className="cards-cont">
          <div className="cards-box">
            <h2 className="world-name">{world.split("-").join(" ")}</h2>
            <div className="cards-grid">
              {filteredWorlds.length > 0 ? (
                filteredWorlds.map((NFT) => (
                  <Card
                    name={NFT.metadata.name}
                    imgURL={NFT.metadata.thumb}
                    desc={NFT.metadata.description}
                  />
                ))
              ) : (
                <p>Sorry, No data found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default World;
