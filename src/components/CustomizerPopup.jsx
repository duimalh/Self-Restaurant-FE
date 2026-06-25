import React, { useState, useEffect } from 'react';
import OrderIcon from "../assets/OrderIcon.png"

export default function CustomizerPopup({ item, onClose, onAdd }) {
    const [size, setSize] = useState('M');
    const [temp, setTemp] = useState('LẠNH');
    const [sweetness, setSweetness] = useState('BÌNH THƯỜNG');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(item.price);
    const isCoffee = item.category?.toLowerCase().includes('vietnamese coffe');

    useEffect(() => {
        let base = item.price;
        if (size === 'L') base += 10000;
        setTotalPrice(base);
    }, [size, item.price]);

    return (
        <div className="modal-overlay">

            <div className="modal-header-section">
                <div className="modal-infor">
                    <img src={item.image} alt={item.name} className="modal-item-image" />
                    <div className="modal-group">
                        <h3 className="modal-item-name">{item.name}</h3>
                        <span className="modal-item-price">{item.price.toLocaleString()} VND</span>
                        <div className="quantity-stepper-box">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="qty-btn">-</button>
                            <span className="qty-numerical-display">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="qty-btn1">+</button>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="btn-dismiss">X</button>
            </div>

            <div className="modal-options-body">
                <div className="option-cluster">
                    <label className="option-label">SIZE </label>
                    <div className="option-buttons two-cols">
                        {['M', 'L'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`choice-pill-btn ${size === s ? 'active' : ''}`}
                            >
                                {s} {s === 'L' && <span className="choice-btn-fee">+10.000VND</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {isCoffee && (
                    <div className="option-cluster">
                        <label className="option-label">NHIỆT ĐỘ NƯỚC</label>
                        <div className="option-buttons two-cols">
                            {['LẠNH', 'NÓNG'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTemp(t)}
                                    className={`choice-pill-btn ${temp === t ? 'active' : ''}`}
                                >
                                    {t === 'LẠNH' ? 'LẠNH' : 'NÓNG'}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="option-cluster">
                    <label className="option-label">ĐỘ NGỌT</label>
                    <div className="option-buttons">
                        {['BÌNH THƯỜNG', 'NHIỀU ĐƯỜNG', 'ÍT ĐƯỜNG', 'KHÔNG ĐƯỜNG'].map((sw) => (
                            <button
                                key={sw}
                                onClick={() => setSweetness(sw)}
                                className={`choice-pill-btn ${sweetness === sw ? 'active' : ''}`}>
                                {sw}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onAdd({
                    id: item.id, name: item.name, image: item.image,
                    size, temp: isCoffee ? temp : 'LẠNH',
                    sweetness, quantity,
                    price: totalPrice, totalPrice: totalPrice
                })}
                className="btn-submit-custom-item"
            >
                <img src={OrderIcon} alt="Thêm vào giỏ" className="btn-submit-icon" />
                <span> Thêm vào giỏ</span>
                <span>{(totalPrice * quantity).toLocaleString()}VND</span>
            </button>
        </div>
    );
}