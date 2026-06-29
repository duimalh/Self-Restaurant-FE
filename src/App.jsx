import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypes from './components/OrderTypes';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Payment from './components/Payment';
import QR from './components/QR';
import Success from './components/Success';
import { getAllCategories } from './services/CategoryService';
import { getAllProducts } from './services/ProductService';
import { createOrder } from './services/OrderService';
import { createPayment } from './services/PaymentService';
import './App.css';

function App() {
  const [screen, setScreen] = useState('WELCOME');
  const [orderType, setOrderType] = useState('');
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState(''); 

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
        ]);

        setCategories(catRes.data.map(c => ({
          id: c.categoryId,
          name: c.categoryName,
          image: c.categoryUrl,
        })));

        setProducts(prodRes.data.map(p => ({
          id: p.productId,
          name: p.productName,
          price: Number(p.productPrice),
          image: p.productUrl,
          category: p.categoryId,      
          optionGroups: p.optionGroups ?? [],
        })));
      } catch (err) {
        console.error('Data loading error:', err);
        setError('Unable to connect to the server. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i =>
        i.id === item.id &&
        JSON.stringify(i.selectedOptionIds) === JSON.stringify(item.selectedOptionIds)
      );
      if (existing) {
        return prev.map(i =>
          i.cartId === existing.cartId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
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

  const handleCheckout = async () => {
    try {
      const orderPayload = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          selectedOptionIds: item.selectedOptionIds ?? [],
        })),
      };
      const res = await createOrder(orderPayload);
      setOrderNumber(String(res.data.orderId));
      setScreen('PAYMENT');
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Unable to create the order. Please try again.');
    }
  };

  const handleSelectPaymentMethod = async (method) => {
    try {
      await createPayment({
        orderId: Number(orderNumber),
        method: method,
      });
      setScreen(method === 'QR' ? 'QR' : 'SUCCESS');
    } catch (err) {
      console.error('Payment error:', err);
      alert('Unable to create the order. Please try again.');
    }
  };

  const resetKiosk = () => {
    setCart([]);
    setOrderType('');
    setOrderNumber('');
    setScreen('WELCOME');
  };

  if (loading) {
    return <div className="kiosk-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Loading menu...</p>
    </div>;
  }

  if (error) {
    return <div className="kiosk-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'red' }}>{error}</p>
    </div>;
  }

  return (
    <div className="kiosk-container">
      {screen === 'WELCOME' && <WelcomeScreen onStart={() => setScreen('ORDER_TYPES')} />}
      {screen === 'ORDER_TYPES' && (
        <OrderTypes
          onSelect={(type) => { setOrderType(type); setScreen('MENU'); }}
          onBack={() => setScreen('WELCOME')}
        />
      )}
      {screen === 'MENU' && (
        <Menu
          categories={categories}
          items={products}
          cart={cart}
          onAddToCart={addToCart}
          onViewOrder={() => setScreen('CART')}
          cartTotal={cartTotal}
        />
      )}
      {screen === 'CART' && (
        <Cart
          cart={cart}
          cartTotal={cartTotal}
          onBack={() => setScreen('MENU')}
          onCheckout={handleCheckout} 
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
        />
      )}
      {screen === 'PAYMENT' && (
        <Payment
          cartTotal={cartTotal}
          onBack={() => setScreen('CART')}
          onSelectMethod={handleSelectPaymentMethod}
        />
      )}
      {screen === 'QR' && (
        <QR
          cartTotal={cartTotal}
          onBack={() => setScreen('PAYMENT')}
          onComplete={() => setScreen('SUCCESS')}
          onTimeout={resetKiosk}
          orderNumber={orderNumber}
          cart={cart}
        />
      )}
      {screen === 'SUCCESS' && (
        <Success
          orderNumber={orderNumber}
          onDone={resetKiosk}
        />
      )}
    </div>
  );
}

export default App;