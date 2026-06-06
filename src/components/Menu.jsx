import React from "react";

export default function Menu({ categories, items, cart, addToCart, viewOrder }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedItem, setSelectedItem] = useState(null);
    const filteredItems = items.filter(item => item.category === selectedCategory);
    const orderItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="menu-screen">
            <div className="menu-container">
                <div className="sidebar-categories">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`category-button ${selectedCategory === cat ? 'active' : ''}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="menu-items">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="menu-item" onClick={() => setSelectedItem(item)}>
                            <img src={item.image} alt={item.name} className="item-image" />
                            <h3 className="menu-item-name">{item.name}</h3>
                            <p className="menu-item-price">${item.price.toFixed()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-button-bar">
                <button className="view-order-button" onClick={viewOrder}>
                    <img src={OrderIcon} alt="Xem đơn hàng" className="view-order-icon" />
                    <span className="view-order-text">Xem đơn hàng</span>
                    <span className="view-order-count">{orderItems}</span>
                </button>
            </div>
            {selectedItem && (
                <CustomizerPopup
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onAdd={(customizedItem) => {
                        addToCart(customizedItem);
                        setSelectedItem(null);
                    }}
                />)}
        </div>
    );
}