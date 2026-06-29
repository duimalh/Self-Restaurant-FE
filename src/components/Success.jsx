import React from "react";
import SuccessIcon from "../assets/SuccessIcon.png";

export default function Success({ orderNumber, onDone }) {
    return (
        <div className="success-screen">
            <div className="success-content">
                <img className="success-anim" src={SuccessIcon} alt="Success" />
                <div className="success-title">Order placed successfully!</div>
                <div className="order-num-box">
                    <div className="order-num-label">Order Number</div>
                    <div className="order-num-val">{orderNumber}</div>
                </div>
                <div className="success-note">
                    Please proceed to the counter to complete your order.
                </div>
            </div>
            <button className="new-order-btn" onClick={onDone}>Refresh</button>
        </div>
    );
}