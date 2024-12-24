import React from "react";
import './Service.css'

const Service = ({ href, label, icon, detail }) => {
    return (
        <a href={href} className="service">
            <h3>{label} {icon}</h3>
            <p>{detail}</p>
        </a>
    );
};

export default Service;
