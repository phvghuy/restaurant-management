// frontend/src/components/MenuItem/MenuItem.js
import React from 'react';
import './MenuItem.css';

const MenuItem = ({ image, name, price }) => {
    return (
        <div className="menu-item">
            <img src={image} alt={name} className="menu-item-image" />
            <h3 className="menu-item-name">{name}</h3>
            <p className="menu-item-price">{price} đ</p>
        </div>
    );
};

export default MenuItem;
