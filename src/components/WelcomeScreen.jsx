import React from 'react';

export default function WelcomeScreen({ onStart }) {
    return (
        <div className="wel-container" onClick={onStart}>
            <div className='wel-action-bar'>
                <h1 className="wel-title">Tap to Order</h1>
            </div>
        </div>
    );
}