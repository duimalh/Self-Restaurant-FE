import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypes from './components/OrderTypes';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Payment from './components/Payment';
import QR from './components/QR';
import Success from './components/Success';
import './App.css'

const CATEGORIES = [
  { id: "vietnamese coffe", name: "Vietnamese Coffe", image: 'https://i.pinimg.com/1200x/81/72/60/81726082c6d0780cb89ef2d45a02684d.jpg' },
  { id: "milk tea", name: "Milk Tea", image: 'https://i.pinimg.com/1200x/bd/f6/65/bdf665afa503a372c02d1480388954dc.jpg' },
  { id: "fruit tea", name: "Fruit Tea", image: 'https://i.pinimg.com/1200x/07/64/a6/0764a653192a11d809a6f7849bf28e84.jpg' },
  { id: "matcha & houjicha", name: "Matcha & Houjicha", image: 'https://i.pinimg.com/736x/d2/7f/8b/d27f8b5bd7955eee2446a0b3447aeafa.jpg' },
];
const MENU_ITEMS = [
  { id: 1, category: "vietnamese coffe", name: "Cà Phê Đen", price: 33000, image: 'https://i.pinimg.com/736x/fa/21/eb/fa21eb28c29f08f40bd7f44e9d21f27d.jpg' },
  { id: 2, category: "vietnamese coffe", name: "Cà Phê Sữa", price: 36000, image: 'https://i.pinimg.com/1200x/ea/b5/1d/eab51d648190226b680df8bb4ff08b4a.jpg' },
  { id: 3, category: "vietnamese coffe", name: "Bạc Xỉu", price: 40000, image: 'https://i.pinimg.com/1200x/ae/34/84/ae3484c74b82ef668d99f42cb3314026.jpg' },
  { id: 4, category: "vietnamese coffe", name: "Bạc Xỉu Sữa Dừa", price: 46000, image: 'https://i.pinimg.com/736x/b9/83/2b/b9832b79ed5b5e333e27305428d469ef.jpg' },
  { id: 5, category: "vietnamese coffe", name: "Sữa Tươi Đường Đen cà Phê", price: 60000, image: 'https://i.pinimg.com/736x/0a/34/4c/0a344cfabbe54777fb3b1ff22405507c.jpg' },
  { id: 6, category: "vietnamese coffe", name: "Cà Phê Cốt Dừa", price: 40000, image: 'https://i.pinimg.com/736x/ee/c7/47/eec747ea34ad9a90bdd652abb64f3c2d.jpg' },
  { id: 7, category: "vietnamese coffe", name: "Cà Phê Dừa Xay", price: 60000, image: 'https://i.pinimg.com/736x/4d/07/c9/4d07c9effcce8f0a5f5cb1cdc42f3bb0.jpg' },
  { id: 8, category: "milk tea", name: "Trà Sữa Thái Đỏ", price: 55000, image: 'https://i.pinimg.com/736x/3b/1b/77/3b1b77d67d2b643ad36ebd29170df649.jpg' },
  { id: 9, category: "milk tea", name: "Trà Sữa Thái Xanh", price: 55000, image: 'https://i.pinimg.com/736x/1a/83/3f/1a833f1bf636f9034328b036476fd59c.jpg' },
  { id: 10, category: "milk tea", name: "Trà Sữa Olong Lài", price: 55000, image: 'https://th.bing.com/th/id/R.f712e60f9af91ea9238bc2805ea0a3db?rik=y5n8KyOF6PvYaw&riu=http%3a%2f%2ffile.hstatic.net%2f200000516795%2farticle%2ftra_sua_oolong_rang_c9ee2c436cc04a9ebb0513c5b0f8eadd.png&ehk=OnlXYX4QMrnaKJw3ZTMGZfYNeV5Gx%2b0r3R9hW2us%2fEw%3d&risl=&pid=ImgRaw&r=0' },
  { id: 11, category: "milk tea", name: "Trà Sữa Olong Rang", price: 55000, image: 'https://i.pinimg.com/1200x/9c/84/8e/9c848ed2eb2b43fd82147879750f80d2.jpg' },
  { id: 12, category: "fruit tea", name: "Trà Lài Dưa Lưới", price: 55000, image: 'https://th.bing.com/th/id/R.3718252dafba68d13fe59769c90f9531?rik=CT4M%2bQ01bsEfVA&pid=ImgRaw&r=0' },
  { id: 13, category: "fruit tea", name: "Trà Lài Atiso Vải", price: 55000, image: 'https://i.pinimg.com/1200x/5e/63/e6/5e63e6ffe3019bd6ba9f7bad24062266.jpg' },
  { id: 14, category: "fruit tea", name: "Trà Lài Dâu Tây", price: 49000, image: 'https://i.pinimg.com/1200x/00/d8/1a/00d81a88d38638e506c530d3a3798a3f.jpg' },
  { id: 15, category: "fruit tea", name: "Trà Lài Nhãn", price: 49000, image: 'https://i.pinimg.com/1200x/01/6c/44/016c440dafbfaff46b8ebdf5071bd539.jpg' },
  { id: 16, category: "fruit tea", name: "Trà Đào Cam Sả", price: 49000, image: 'https://i.pinimg.com/736x/13/29/2f/13292f0a2609c317a663c29128414934.jpg' },
  { id: 17, category: "matcha & houjicha", name: "Matcha Latte", price: 59000, image: 'https://i.pinimg.com/736x/28/b0/7f/28b07f5c9a74fdcbc84c465cf54571a8.jpg' },
  { id: 18, category: "matcha & houjicha", name: "Matcha Đá Xay", price: 59000, image: 'https://i.pinimg.com/1200x/63/23/f9/6323f999dcfde756c62589d16e1df2cf.jpg' },
  { id: 19, category: "matcha & houjicha", name: "Matcha Cam Vàng", price: 69000, image: 'https://i.pinimg.com/736x/52/68/d4/5268d4aeeaaf347520a221ad55604202.jpg' },
  { id: 20, category: "matcha & houjicha", name: "Houjicha Latte ", price: 59000, image: 'https://i.pinimg.com/1200x/70/9e/59/709e599c84610aca9a1dbcfb233e2055.jpg' },
  { id: 21, category: "matcha & houjicha", name: "Coco Houjicha", price: 69000, image: 'https://i.pinimg.com/1200x/95/fd/b9/95fdb92b5ee3d408a01a9494946f091f.jpg' },
  { id: 22, category: "matcha & houjicha", name: "Trà Rang Houjicha Phô Mai", price: 69000, image: 'https://i.pinimg.com/736x/28/18/b3/2818b36cf9dadaf45c4a467e7dc47aa2.jpg' },
];

function App() {
  const [screen, setScreen] = useState('WELCOME');
  const [orderType, setOrderType] = useState('');
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');


  const generateOrderNumber = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(String(num));
  };

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

  const handleSelectPaymentMethod = (method) => {
    generateOrderNumber();
    setScreen(method === "QR" ? "QR" : "SUCCESS");
  };


  const resetKiosk = () => {
    setCart([]);
    setOrderType('');
    setOrderNumber('');
    setScreen('WELCOME');
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
            setScreen('PAYMENT');
          }}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
        />
      )}
      {screen === 'PAYMENT' && (
        <Payment
          onBack={() => setScreen('CART')}
          onSelectMethod={handleSelectPaymentMethod}
        />
      )}
      {screen === "QR" && (
        <QR
          cartTotal={cartTotal}
          onBack={() => setScreen("PAYMENT")}
          onComplete={() => setScreen("SUCCESS")}
          onTimeout={resetKiosk}
          orderNumber={orderNumber}
          cart={cart}
        />
      )}
      {
        screen === "SUCCESS" && (
          <Success
            orderNumber={orderNumber}
            onDone={resetKiosk}
          />
        )
      }
    </div>
  )
}

export default App
