import React, { useState, useMemo } from 'react';
import OrderIcon from "../assets/OrderIcon.png";

export default function CustomizerPopup({ item, onClose, onAdd }) {
    const [quantity, setQuantity] = useState(1);

    const initialSelections = useMemo(() => {
        const init = {};
        (item.optionGroups ?? []).forEach(group => {
            if (group.required && group.options?.length > 0) {
                const first = group.options[0];
                init[group.groupId] = {
                    optionId: first.optionId,
                    optionName: first.optionName,
                    optionPrice: Number(first.optionPrice ?? 0),
                };
            }
        });
        return init;
    }, [item]);

    const [selectedOptions, setSelectedOptions] = useState(initialSelections);

    const optionExtraTotal = Object.values(selectedOptions)
        .reduce((sum, o) => sum + (o.optionPrice ?? 0), 0);

    const unitPrice = item.price + optionExtraTotal;

    const handleSelectOption = (groupId, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [groupId]: {
                optionId: option.optionId,
                optionName: option.optionName,
                optionPrice: Number(option.optionPrice ?? 0),
            },
        }));
    };

    const handleAdd = () => {
        const selectedOptionIds = Object.values(selectedOptions).map(o => o.optionId);

        const optionLabels = Object.entries(selectedOptions).map(([groupId, opt]) => {
            const group = (item.optionGroups ?? []).find(g => g.groupId === Number(groupId));
            return `${group?.groupName ?? ''}: ${opt.optionName}`;
        });

        onAdd({
            id: item.id,
            name: item.name,
            image: item.image,
            quantity,
            price: unitPrice,
            selectedOptionIds,  
            optionLabels,       
        });
    };

    const hasOptions = (item.optionGroups ?? []).length > 0;

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
                {!hasOptions && (
                    <p style={{ textAlign: 'center', color: '#888' }}>Sản phẩm không có tùy chọn thêm</p>
                )}

                {}
                {(item.optionGroups ?? []).map(group => (
                    <div key={group.groupId} className="option-cluster">
                        <label className="option-label">
                            {group.groupName.toUpperCase()}
                            {group.required && <span style={{ color: 'red' }}> *</span>}
                        </label>
                        <div className="option-buttons">
                            {(group.options ?? []).map(option => {
                                const isSelected = selectedOptions[group.groupId]?.optionId === option.optionId;
                                const price = Number(option.optionPrice ?? 0);
                                return (
                                    <button
                                        key={option.optionId}
                                        onClick={() => handleSelectOption(group.groupId, option)}
                                        className={`choice-pill-btn ${isSelected ? 'active' : ''}`}
                                    >
                                        {option.optionName}
                                        {price > 0 && (
                                            <span className="choice-btn-fee">
                                                +{price.toLocaleString()}VND
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAdd}
                className="btn-submit-custom-item"
            >
                <img src={OrderIcon} alt="Thêm vào giỏ" className="btn-submit-icon" />
                <span> Thêm vào giỏ</span>
                <span>{(unitPrice * quantity).toLocaleString()}VND</span>
            </button>
        </div>
    );
}