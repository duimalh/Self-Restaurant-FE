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
  const [orderNumber, setOrderNumber] = useState('');  // Bug FE-4 fix: lưu orderId thật từ BE

  // Bug FE-2 fix: load data từ BE thay vì hardcode
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

        // Map BE fields → FE format
        // BE: { categoryId, categoryName, categoryUrl }
        // categoryUrl giờ chứa image URL (sau khi sửa data.sql)
        setCategories(catRes.data.map(c => ({
          id: c.categoryId,
          name: c.categoryName,
          image: c.categoryUrl,
        })));

        // BE: { productId, productName, productPrice, productUrl, categoryId, optionGroups }
        // productUrl giờ chứa image URL (sau khi sửa data.sql)
        setProducts(prodRes.data.map(p => ({
          id: p.productId,
          name: p.productName,
          price: Number(p.productPrice),
          image: p.productUrl,
          category: p.categoryId,       // integer ID từ BE
          optionGroups: p.optionGroups ?? [],
        })));
      } catch (err) {
        console.error('Lỗi load dữ liệu:', err);
        setError('Không thể kết nối server. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Bug FE-5 fix: cart item giờ chứa selectedOptionIds (list<Integer>) để gửi BE
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

  // Bug FE-3 fix: gọi createOrder khi checkout, createPayment khi chọn payment method
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
      // Bug FE-4 fix: dùng orderId thật từ BE
      setOrderNumber(String(res.data.orderId));
      setScreen('PAYMENT');
    } catch (err) {
      console.error('Lỗi tạo đơn hàng:', err);
      alert('Không thể tạo đơn hàng. Vui lòng thử lại.');
    }
  };

  const handleSelectPaymentMethod = async (method) => {
    try {
      await createPayment({
        orderId: Number(orderNumber),
        method: method, // "CASH" hoặc "QR" — khớp với enum PaymentMethod trong BE
      });
      setScreen(method === 'QR' ? 'QR' : 'SUCCESS');
    } catch (err) {
      console.error('Lỗi thanh toán:', err);
      alert('Không thể xử lý thanh toán. Vui lòng thử lại.');
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
      <p>Đang tải menu...</p>
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
          onCheckout={handleCheckout}   // Bug FE-3 fix: gọi async handleCheckout
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