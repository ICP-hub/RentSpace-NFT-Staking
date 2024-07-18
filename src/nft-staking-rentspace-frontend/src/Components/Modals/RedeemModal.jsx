import React, { useState } from "react";
import "./RedeemModal.css";
import coinAnimation from "../../../public/coins.gif";
import { convertPointstoICP } from "../../utils/utils";
import { IoInformationCircleOutline } from "react-icons/io5";

function handleSubmit(event) {
  // Remove this after handleSubmit function is defined
  event.preventDefault();
  console.log("Redeem Successful");
}

export const Info = ({message})=> {
  return (
    <div>
    <div className="info-box">
      <IoInformationCircleOutline />
      <p>{message}</p>
    </div>
    </div>
  )
}

const RedeemModal = ({ userID, rewardPoints, isOpen, closeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) return;

  function closeModal(isOpen) {
    setIsOpen(!isOpen)
  }

  const rarity = [
    {
      Common: 2,
      Uncommon: 4,
      Rare: 6,
      Epic: 1,
      Legendary: 5,
    },
  ];

  const rarityData = rarity[0];
  const entries = Object.entries(rarityData);
  const [redeemAmount, setRedeemAmount] = useState(rewardPoints);

  const handleChange = (event) => {
    setRedeemAmount(event.target.value);
  };
  return (
    <div className="rewards-modal">
    <div>X</div>
      <h3 className="redeem-header">Redeem Rewards!</h3>
      <div className="reward-points-Cont">
        <div className="reward-points">
          <h5 className="secondary-color">Total Reward Points</h5>
          <p className="points-box">{rewardPoints}</p>
        </div>
        <div className="points-worth">
          <h5 className="secondary-color">Points worth</h5>
          <p>{convertPointstoICP(rewardPoints)} ICP</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="widthfull">
        <h6 className="secondary-color">Amount to Redeem</h6>
        <div className="slider-Cont widthfull">
          <input
            type="range"
            min={0}
            max={rewardPoints}
            value={redeemAmount}
            onChange={handleChange}
            className="widthfull amount-slider"
            
          />
          <span className="redeem-amount">{redeemAmount}</span>
        </div>
        <div className="widthfull table-Cont">
          <table className="widthfull table">
            <thead>
              <tr className="widthfull">
                <th className="rarity-table-left">Rarity</th>
                <th className="rarity-table-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([key, value]) => (
                <tr className="widthfull" key={key.toString()}>
                  <td className="rarity-table-left">{key}</td>
                  <td className="rarity-table-right">{value}</td>  
                </tr>
              ))}
                  <img
                    src={coinAnimation}
                    className="coin-animation"
                    alt="coin-animation"
                  />    
            </tbody>
          </table>
          <Info message={"Minimum 10 Points required for Redemption"}/>
        </div>
        <div>
        </div>
        <button>Redeem Rewards</button>
      </form>
    </div>
  );
};

export default RedeemModal;
