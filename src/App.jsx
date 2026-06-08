import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypes from './components/OrderTypes';
import Menu from './components/Menu';
import './App.css'

const CATEGORIES = [
  { id: "vietnamese coffe", name: "Vietnamese Coffe" },
  { id: "milk tea", name: "Milk Tea" },
  { id: "fruit tea", name: "Fruit Tea" },
  { id: "matcha & houjicha", name: "Matcha & Houjicha" },
];
const MENU_ITEMS = [
  { id: 1, category: "vietnamese coffe", name: "Cà Phê Đen", price: 33000 },
  { id: 2, category: "vietnamese coffe", name: "Cà Phê Sữa", price: 36000 },
  { id: 3, category: "vietnamese coffe", name: "Bạc Xỉu", price: 40000 },
  { id: 4, category: "vietnamese coffe", name: "Bạc Xỉu Sữa Dừa", price: 46000 },
  { id: 5, category: "vietnamese coffe", name: "Sữa Tươi Đường Đen cà Phê", price: 60000 },
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

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="kiosk-container">
      {screen === 'WELCOME' && <WelcomeScreen onStart={() => setScreen('ORDER_TYPES')} />}
      {screen === 'ORDER_TYPES' && <OrderTypes onSelect={(type) => { setOrderType(type); setScreen('MENU'); }} onBack={() => setScreen('WELCOME')} />}
      {screen === 'MENU' && <Menu categories={CATEGORIES} items={MENU_ITEMS} cart={cart} onAddToCart={addToCart} onViewOrder={() => setScreen('CART')}
        cartTotal={cartTotal} />}
    </div>
  )
}

export default App
