// frontend/src/components/BlogCard/BlogCard.js
import React from 'react';
import '../BlogCard/BlogCard.css';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';

const BlogCard = ({ title, date, imageUrl, content, author, postId, isAdmin, onDelete, onEdit }) => {
  const imageSrc = imageUrl; 

  const handleEditClick = (event) => {
    event.stopPropagation(); // Ngăn chặn propagation
    onEdit(postId); // Gọi hàm onEdit như bình thường
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Ngăn chặn propagation cho cả Delete (đề phòng)
    onDelete(postId);
  };

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
          {isAdmin && (
            <>
              <FaEdit className="blog-icon" onClick={handleEditClick} />
              <FaTrash className="blog-icon" onClick={handleDeleteClick} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;