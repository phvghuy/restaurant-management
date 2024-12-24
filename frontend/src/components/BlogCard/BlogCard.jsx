// frontend/src/components/BlogCard/BlogCard.js
import React from 'react';
import '../BlogCard/BlogCard.css';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';

const BlogCard = ({ title, date, imageUrl, content, author, postId, accessToken, onDelete, onEdit }) => {
    const handleEdit = () => {
      onEdit(postId); // Gọi hàm onEdit từ props
    };

    const handleDelete = () => {
      onDelete(postId); // Gọi hàm onDelete từ props
    };

    const imageSrc = imageUrl || '/images/default-blog-image.png';

    return (
        <div className="blog-card">
            <img src={imageSrc} alt="Blog" className="blog-image" />
            <h2 className="blog-card-title">{title}</h2>
            <p className="blog-content">{content}</p>
            <p className="blog-author">Tác giả: {author}</p>
            <div className="blog-card-footer">
                <p className="blog-date">🕳 {date}</p>
                <div className="blog-actions">
                    <FaHeart className="blog-icon" />
                    <FaEdit className="blog-icon" onClick={handleEdit} />
                    <FaTrash className="blog-icon" onClick={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default BlogCard;