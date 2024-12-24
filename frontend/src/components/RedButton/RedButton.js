import React from 'react';
import './RedButton.css';

const RedButton = ({ label, onClick }) => {
    return (
        <button className="btn-reserve" onClick={onClick}>
            {label}
        </button>
    );
};

export default RedButton;
