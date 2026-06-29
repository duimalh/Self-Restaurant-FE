import React, { useState, useRef } from "react";
import OrderIcon from "../assets/OrderIcon.png";
import CustomizerPopup from "./CustomizerPopup";

export default function Menu({ categories, items, cart, onAddToCart, onViewOrder, cartTotal }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedItem, setSelectedItem] = useState(null);
    const menuScrollRef = useRef(null);
    const catRefs = useRef({});
    const orderItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        const catElement = catRefs.current[cat.id];
        if (catElement && menuScrollRef.current) {
            menuScrollRef.current.scrollTo({
                top: catElement.offsetTop - menuScrollRef.current.offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="menu-screen">
            <div className="menu-container">
                <aside className="sidebar-categories">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat)}
                            className={`category-button ${selectedCategory.id === cat.id ? 'active' : ''}`}    >
                            <img src={cat.image} alt={cat.name} className="category-image" />
                            <span>{cat.name.toUpperCase()}</span>
                        </button>
                    ))}
                </aside>
                <main className="menu-items" ref={menuScrollRef}>
                    {categories.map((cat) => {
                        const catItems = items.filter(item => item.category === cat.id);
                        return (
                            <div key={cat.id} ref={el => catRefs.current[cat.id] = el} className="menu-category-section">
                                <h3 className="menu-category-title">{cat.name}</h3>
                                {catItems.map((item) => (
                                    <div key={item.id} className="menu-item" onClick={() => setSelectedItem(item)}>
                                        <div className="image-wrapper">
                                            <img src={item.image} alt={item.name} className="item-image" />
                                        </div>
                                        <span className="menu-item-name">{item.name}</span>
                                        <span className="menu-item-price">{item.price.toLocaleString()}VND</span>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                    <div className="menu-button-bar">
                        <button className="view-order-button" onClick={onViewOrder}>
                            <img src={OrderIcon} alt="View order" className="view-order-icon" />
                            <span className="view-order-text">Xem giỏ hàng</span>
                            <span className="view-order-count">{orderItems}</span>
                            <span className="view-order-total">{cartTotal.toLocaleString()}VND</span>
                        </button>
                    </div>
                </main>
            </div>

            {
                selectedItem && (
                    <CustomizerPopup
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        onAdd={(customizedItem) => {
                            onAddToCart(customizedItem);
                            setSelectedItem(null);
                        }}
                    />)
            }
        </div >
    );
}