import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypes from './components/OrderTypes';
import Menu from './components/Menu';
import Cart from './components/Cart';
import './App.css'

const CATEGORIES = [
  { id: "vietnamese coffe", name: "Vietnamese Coffe", image: 'https://i.pinimg.com/736x/38/cf/f3/38cff30bed7d6f9820721510e13c6266.jpg' },
  { id: "milk tea", name: "Milk Tea" },
  { id: "fruit tea", name: "Fruit Tea" },
  { id: "matcha & houjicha", name: "Matcha & Houjicha" },
];
const MENU_ITEMS = [
  { id: 1, category: "vietnamese coffe", name: "Cà Phê Đen", price: 33000, image: 'https://i.pinimg.com/736x/fa/21/eb/fa21eb28c29f08f40bd7f44e9d21f27d.jpg' },
  { id: 2, category: "vietnamese coffe", name: "Cà Phê Sữa", price: 36000, image: 'https://i.pinimg.com/1200x/ea/b5/1d/eab51d648190226b680df8bb4ff08b4a.jpg' },
  { id: 3, category: "vietnamese coffe", name: "Bạc Xỉu", price: 40000, image: 'https://i.pinimg.com/1200x/ae/34/84/ae3484c74b82ef668d99f42cb3314026.jpg' },
  { id: 4, category: "vietnamese coffe", name: "Bạc Xỉu Sữa Dừa", price: 46000, image: 'https://i.pinimg.com/736x/b9/83/2b/b9832b79ed5b5e333e27305428d469ef.jpg' },
  { id: 5, category: "vietnamese coffe", name: "Sữa Tươi Đường Đen cà Phê", price: 60000, image: 'https://i.pinimg.com/736x/0a/34/4c/0a344cfabbe54777fb3b1ff22405507c.jpg' },
  { id: 6, category: "vietnamese coffe", name: "Cà Phê Cốt Dừa", price: 40000 },
  { id: 7, category: "vietnamese coffe", name: "Cà Phê Dừa Xay", price: 60000 },
  { id: 8, category: "milk tea", name: "Trà Sữa Thái Đỏ", price: 55000 },
  { id: 9, category: "milk tea", name: "Trà Sữa Thái Xanh", price: 55000 },
  { id: 10, category: "milk tea", name: "Trà Sữa Olong Lài", price: 55000 },
  { id: 11, category: "milk tea", name: "Trà Sữa Olong Rang", price: 55000 },
  { id: 12, category: "fruit tea", name: "Trà Lài Dưa Lưới", price: 55000 },
  { id: 13, category: "fruit tea", name: "Trà Lài Atiso Vải", price: 55000 },
  { id: 14, category: "fruit tea", name: "Trà Lài Dâu Tây", price: 49000 },
  { id: 15, category: "fruit tea", name: "Trà Lài Nhãn", price: 49000 },
  { id: 16, category: "fruit tea", name: "Trà Đào Cam Sa", price: 49000 },
  { id: 17, category: "matcha & houjicha", name: "Matcha Latte", price: 59000 },
  { id: 18, category: "matcha & houjicha", name: "Matcha Đá Xay", price: 59000 },
  { id: 19, category: "matcha & houjicha", name: "Matcha Cam Vàng", price: 69000 },
  { id: 20, category: "matcha & houjicha", name: "Houjicha Latte ", price: 59000 },
  { id: 21, category: "matcha & houjicha", name: "Coco Houjicha", price: 69000 },
  { id: 22, category: "matcha & houjicha", name: "Trà Rang Houjicha Phô Mai", price: 69000 },
];

function App() {
  const [screen, setScreen] = useState('WELCOME');
  const [orderType, setOrderType] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i =>
        i.id === item.id &&
        i.size === item.size &&
        i.temp === item.temp &&
        i.sweetness === item.sweetness
      );
      if (existing) {
        return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, cartId: `${item.id}-${Date.now()}` }];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleUpdateQty = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  return (
    <div className="kiosk-container">
      {screen === 'WELCOME' && <WelcomeScreen onStart={() => setScreen('ORDER_TYPES')} />}
      {screen === 'ORDER_TYPES' && <OrderTypes onSelect={(type) => { setOrderType(type); setScreen('MENU'); }} onBack={() => setScreen('WELCOME')} />}
      {screen === 'MENU' && <Menu categories={CATEGORIES} items={MENU_ITEMS} cart={cart} onAddToCart={addToCart} onViewOrder={() => setScreen('CART')}
        cartTotal={cartTotal} />}
      {screen === 'CART' && (
        <Cart
          cart={cart}
          cartTotal={cartTotal}
          onBack={() => setScreen('MENU')}
          onCheckout={() => {
            setOrderNumber(String(Math.floor(Math.random() * 90000) + 10000));
            setScreen('PAYMENT');
          }}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
        />
      )}
    </div>
  )
}

export default App
