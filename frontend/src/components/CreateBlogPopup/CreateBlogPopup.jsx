// frontend/src/components/CreateBlogPopup/CreateBlogPopup.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/apiRequest';
import './CreateBlogPopup.css';
import { resetCreateBlogState } from '../../redux/blogSlice';

const CreateBlogPopup = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      content: newBlogContent,
      author: newBlogAuthor,
      imageUrl: '/images/default-blog-image.png', // Đường dẫn ảnh mặc định
    };

    try {
      await createBlog(newBlog, accessToken, dispatch, onSuccess);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    dispatch(resetCreateBlogState());
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setNewBlogTitle('');
      setNewBlogContent('');
      setNewBlogAuthor('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="create-blog-popup">
        <div className="popup-header">
          <h2>Tạo bài viết mới</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleCreateBlog}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề:</label>
            <input
              type="text"
              id="title"
              value={newBlogTitle}
              onChange={(e) => setNewBlogTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Nội dung:</label>
            <textarea
              id="content"
              value={newBlogContent}
              onChange={(e) => setNewBlogContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Tác giả:</label>
            <input
              type="text"
              id="author"
              value={newBlogAuthor}
              onChange={(e) => setNewBlogAuthor(e.target.value)}
            />
          </div>
          <button type="submit" className="create-btn">
            Tạo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPopup;