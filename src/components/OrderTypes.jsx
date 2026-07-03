import React from "react";
import Dinein from "../assets/Dinein.png";
import Takeout from "../assets/Takeout.png";

export default function OrderTypes({ onSelect, onBack }) {
    return (
        <div className="types-container">
            <div className="types-center">
                <h2 className="types-heading">Where would you like to enjoy it?</h2>
                <div className="types-group">
                    <button onClick={() => onSelect('dine-in')} className="type-button">
                        <img className="type-image" src={Dinein} alt="Dinein" />
                        <span className="type-label">Dinein</span>
                    </button>
                    <button onClick={() => onSelect('takeout')} className="type-button">
                        <img className="type-image" src={Takeout} alt="Takeaway" />
                        <span className="type-label">Takeaway</span>
                    </button>
                </div>
            </div>
            <button onClick={onBack} className="back-button">← Start over</button>
        </div>
    );
}