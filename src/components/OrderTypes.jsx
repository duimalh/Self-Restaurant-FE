import React from "react";
import Dinein from "../assets/Dinein.png";
import Takeout from "../assets/Takeout.png";

export default function OrderTypes({ onSelect, onBack }) {
    return (
        <div className="types-container">
            <div className="types-center">
                <h2 className="types-heading">Bạn muốn thưởng thức tại đâu?</h2>
                <div className="types-group">
                    <button onClick={() => onSelect('dine-in')} className="type-button">
                        <img className="type-image" src={Dinein} alt="Tại chỗ" />
                        <span className="type-label">Tại chỗ</span>
                    </button>
                    <button onClick={() => onSelect('takeout')} className="type-button">
                        <img className="type-image" src={Takeout} alt="Mang đi" />
                        <span className="type-label">Mang đi</span>
                    </button>
                </div>
            </div>
            <button onClick={onBack} className="back-button">← Bắt đầu lại</button>
        </div>
    );
}