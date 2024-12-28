// frontend/src/components/CreateBlogPopup/CreateBlogPopup.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/apiRequest';
import { resetCreateBlogState } from '../../redux/blogSlice';
import './CreateBlogPopup.css';

const CreateBlogPopup = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const isCreating = useSelector((state) => state.blogs.createBlog.isFetching);
  const isCreateError = useSelector((state) => state.blogs.createBlog.error);
  const isCreateSuccess = useSelector(
    (state) => state.blogs.createBlog.success
  );

  // Xử lý khi component unmount hoặc đóng
  useEffect(() => {
    return () => {
      dispatch(resetCreateBlogState()); // Reset state khi component unmount
    };
  }, [dispatch]);

  // Hiển thị thông báo lỗi khi tạo blog thất bại
  useEffect(() => {
    if (isCreateError) {
      alert('Failed to create blog. Please try again.');
      dispatch(resetCreateBlogState());
    }
  }, [isCreateError, dispatch]);

  // Hiển thị thông báo khi tạo blog thành công và không có lỗi
  useEffect(() => {
    if (isCreateSuccess) {
      alert('Blog được tạo thành công');
      onSuccess();
      onClose();
      setBlogTitle('');
      setBlogContent('');
      setBlogAuthor('');
      setBlogImage(null);
      dispatch(resetCreateBlogState());
    }
  }, [isCreateSuccess, dispatch, onClose, onSuccess]);

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra điều kiện bắt buộc nhập đầy đủ thông tin
    if (!blogTitle || !blogContent || !blogAuthor) {
      alert('Vui lòng nhập đầy đủ tiêu đề, nội dung và tác giả.');
      return;
    }

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', blogContent);
    formData.append('author', blogAuthor);
    formData.append('imageUrl', blogImage);

    // Chỉ gọi createBlog khi đã nhập đầy đủ thông tin
    createBlog(formData, accessToken, dispatch, onSuccess).catch((err) => {
      // Xử lý lỗi: hiển thị thông báo lỗi
      console.error(err);
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form fields khi đóng popup
    setBlogTitle('');
    setBlogContent('');
    setBlogAuthor('');
    setBlogImage(null);
  };

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề:</label>
            <input
              type="text"
              id="title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Nội dung:</label>
            <textarea
              id="content"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Tác giả:</label>
            <input
              type="text"
              id="author"
              value={blogAuthor}
              onChange={(e) => setBlogAuthor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Ảnh:</label>
            <input type="file" id="image" onChange={handleImageChange} />
          </div>
          <button type="submit" className="create-btn" disabled={isCreating}>
            {/* Luôn hiển thị "Tạo bài viết" */}
            Tạo bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPopup;