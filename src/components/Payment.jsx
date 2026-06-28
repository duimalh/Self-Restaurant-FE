import React, { useState, useEffect } from 'react';
import Cash from "../assets/Cash.png";
import QR from "../assets/QR.png";

export default function Payment({ cartTotal, orderType, onBack, onSelectMethod }) {


    return (
        <div className="payment-wrapper">
            <div className="payment-body">
                <div className="payment-heading">
                    <h2 className="payment-main-heading">
                        Bạn muốn thanh toán bằng cách nào?
                    </h2>
                </div>
                <div className="payment-options">
                    <button onClick={() => onSelectMethod("CASH")} className="pay-card">
                        <img className="pay-card-img" src={Cash} alt="Cash"></img>
                        <div>
                            <h4 className="pay-card-title">CASH</h4>
                            <p className="pay-card-text">Thanh toán tại quầy</p>
                        </div>
                    </button>

                    <button onClick={() => onSelectMethod("QR")} className="pay-card">
                        <img className="pay-card-img" src={QR} alt="QR"></img>
                        <div>
                            <h4 className="pay-card-title">QR</h4>
                            <p className="pay-card-text">Quét mã QR tại đây</p>
                        </div>
                    </button>
                </div>
            </div>
            <button onClick={onBack} className="back-button">
                ← Trở lại
            </button>
        </div>
    );
}