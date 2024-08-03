import React, { useDeferredValue, useEffect, useState } from "react";
import "./RedeemModal.css";
import coinAnimation from "/Assets/coins.gif?url";
import { convertPointstoICP } from "../../utils/utils";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useAuth } from "../../utils/useAuthClient";
import { useDispatch } from "react-redux";
import { updatePoints } from "../../utils/Redux-Config/UserSlice";
import Modal from "./Modal";
import { FaXmark } from "react-icons/fa6";

export const Info = ({ message }) => {
  return (
    <div>
      <div className="info-box">
        <IoInformationCircleOutline />
        <p>{message}</p>
      </div>
    </div>
  )
}

const RedeemModal = ({ userID, rewardPoints, isModalOpen, setIsModalOpen }) => {
  const { actors } = useAuth()
  const MIN_REQ_POINTS = 10;
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ status: "", message: "" });
  const deferredRedeemAmount = useDeferredValue(redeemAmount)
  const dispatch = useDispatch()

  const displayDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);

    }, 5000)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if (deferredRedeemAmount < MIN_REQ_POINTS) {
      // alert('Minimum 10 points required for redemption.')
      setDialogInfo({ status: 'error', message: 'Minimum 10 points required for redemption.' })
      displayDialog();
      return
    }
    try {
      const transfer = await actors.userActor.claimPoints(parseInt(rewardPoints))
      if (transfer?.ok) {
        // alert("Transfered Success!")
        setRedeemAmount(0)
        dispatch(updatePoints(parseInt(rewardPoints) - parseInt(deferredRedeemAmount * 100)))
        setDialogInfo({ status: 'success', message: 'Redeem Successful' });
        displayDialog();
      }
      else {
        throw new Error(transfer?.err)
      }
    }
    catch (e) {
      // alert(e);
      setDialogInfo({ status: 'error', message: 'Redeem Failed' });
      displayDialog();
    }
  }

  if (!isModalOpen) return;

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

  const handleChange = (event) => {
    setRedeemAmount(event.target.value);
  };

  useEffect(() => {
    console.log(redeemAmount);
    console.log(deferredRedeemAmount)
    console.log('----Render End----')
  }, [redeemAmount, deferredRedeemAmount])
  return (
    <div className="rewards-modal">
      {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog} />}
      <div className="redeem-closeBtn" onClick={() => setIsModalOpen(!isModalOpen)}><FaXmark size={25} /></div>
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
      <form onSubmit={handleClick} className="widthfull">
        <h6 className="secondary-color">Amount to Redeem</h6>
        <div className="slider-Cont widthfull">
          <input
            type="range"
            min={0}
            max={convertPointstoICP(rewardPoints)}
            value={deferredRedeemAmount}
            onChange={handleChange}
            className="widthfull amount-slider"

          />
          <span className="redeem-amount">{deferredRedeemAmount}</span>
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
          <Info message={"Minimum 10 Points required for Redemption"} />
        </div>
        <div>
        </div>
        <button>Redeem Rewards</button>
      </form>
    </div>
  );
};

export default RedeemModal;
