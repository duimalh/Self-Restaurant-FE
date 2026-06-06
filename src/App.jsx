import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypes from './components/OrderTypes';
import Menu from './components/Menu';
import './App.css'

function App() {
  const [screen, setScreen] = useState('WELCOME');
  const [orderType, setOrderType] = useState(null);

  return (
    <div className="kiosk-container">
      {screen === 'WELCOME' && <WelcomeScreen onStart={() => setScreen('ORDER_TYPES')} />}
      {screen === 'ORDER_TYPES' && <OrderTypes onSelect={(type) => { setOrderType(type); setScreen('MENU'); }} onBack={() => setScreen('WELCOME')} />}

    </div>
  )
}

export default App
