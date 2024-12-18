import React from 'react';
import '../BlogCard/BlogCard.css'
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';

const BlogCard = ({ title, date, imageUrl }) => {
    return (
        <div className="blog-card">
            <img src={imageUrl} alt="Blog" className="blog-image" />
            <h2 className="blog-card-title">{title}</h2>
            <div className="blog-card-footer">
                <p className="blog-date">🕳 {date}</p>
                <div className="blog-actions">
                    <FaHeart className="blog-icon" />
                </div>
            </div>
        </div>
    );
};

export default BlogCard;