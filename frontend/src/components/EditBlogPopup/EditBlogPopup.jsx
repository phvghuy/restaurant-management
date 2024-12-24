// frontend/src/components/EditBlogPopup/EditBlogPopup.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updateBlog } from '../../redux/apiRequest'; // Import updateBlog
import './EditBlogPopup.css'; // Tạo file CSS tương ứng (copy từ CreateBlogPopup.css)

const EditBlogPopup = ({ isOpen, onClose, onSuccess, blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const [editedBlogTitle, setEditedBlogTitle] = useState('');
  const [editedBlogContent, setEditedBlogContent] = useState('');
  const [editedBlogAuthor, setEditedBlogAuthor] = useState('');

  useEffect(() => {
    if (blog) {
      setEditedBlogTitle(blog.title);
      setEditedBlogContent(blog.content);
      setEditedBlogAuthor(blog.author);
    }
  }, [blog]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      title: editedBlogTitle,
      content: editedBlogContent,
      author: editedBlogAuthor,
    };

    try {
      await updateBlog(blog._id, updatedBlog, accessToken, dispatch, onSuccess);
      onClose(); // Đóng popup sau khi update thành công
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !blog) return null;

  return (
    <div className="popup-overlay">
      <div className="create-blog-popup">
        <div className="popup-header">
          <h2>Chỉnh sửa bài viết</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleUpdateBlog}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề:</label>
            <input
              type="text"
              id="title"
              value={editedBlogTitle}
              onChange={(e) => setEditedBlogTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Nội dung:</label>
            <textarea
              id="content"
              value={editedBlogContent}
              onChange={(e) => setEditedBlogContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Tác giả:</label>
            <input
              type="text"
              id="author"
              value={editedBlogAuthor}
              onChange={(e) => setEditedBlogAuthor(e.target.value)}
            />
          </div>
          <button type="submit" className="create-btn">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPopup;