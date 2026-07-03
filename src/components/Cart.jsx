import React from 'react';
import Trash from "../assets/Trash.png";
import OrderIcon from "../assets/OrderIcon.png";

export default function Cart({ cart, cartTotal, onBack, onCheckout, onUpdateQty, onRemove }) {
  return (
    <div className="cart-screen">
      <div className="cart-header">
        <h2 className="cart-title">Cart </h2>
      </div>

      <div className="cart-items-area">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Empty cart</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.cartId} className="cart-item-row">
              <div className="cart-item-left">
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-title">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <ul className="cart-item-options">
                    {}
                    {(item.optionLabels ?? []).map((label, i) => (
                      <li key={i}>{label}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="cart-item-right">
                <div className="qty-stepper-box">
                  <button onClick={() => onUpdateQty(item.cartId, item.quantity - 1)} className="cart-qty-btn"> v </button>
                  <span className="qty-numerical">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.cartId, item.quantity + 1)} className="cart-qty-btn1"> v </button>
                </div>
                <div className="cart-item-price">
                  {(item.price * item.quantity).toLocaleString()} VND
                </div>
                <button onClick={() => onRemove(item.cartId)} className="btn-item-remove">
                  <img className="btn-item-icon" src={Trash} alt="Thùng rác" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-buttons">
        <button onClick={onBack} className="btn-back-menu">
          ← Return to menu
        </button>
        <button onClick={onCheckout} disabled={cart.length === 0} className="btn-checkout ">
          <span className="cart-checkout-text">
            <img className="cart-checkout-icon" src={OrderIcon} alt="Checkout img" /> Check out now
          </span>
          <span>{cartTotal.toLocaleString()}VND</span>
        </button>
      </div>
    </div>
  );
}