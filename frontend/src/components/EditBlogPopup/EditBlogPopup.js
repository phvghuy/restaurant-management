// frontend/src/components/EditBlogPopup/EditBlogPopup.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../../redux/apiRequest";
import "./EditBlogPopup.css";

const EditBlogPopup = ({ isOpen, onClose, onSuccess, blog, axiosJWT }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const [editedBlogTitle, setEditedBlogTitle] = useState("");
  const [editedBlogContent, setEditedBlogContent] = useState("");
  const [editedBlogAuthor, setEditedBlogAuthor] = useState("");

  useEffect(() => {
    if (blog) {
      setEditedBlogTitle(blog.title);
      setEditedBlogContent(blog.content);
      setEditedBlogAuthor(blog.author);
    }
  }, [blog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editedBlogTitle);
    formData.append("content", editedBlogContent);
    formData.append("author", editedBlogAuthor);

    try {
      await updateBlog(blog._id, formData, accessToken, dispatch, axiosJWT);
      onSuccess(); // Gọi hàm callback để thông báo cập nhật thành công
      onClose();
    } catch (err) {
      console.error(err);
      alert(err); // Hiển thị thông báo lỗi từ server hoặc lỗi kết nối
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form fields khi đóng popup
    setEditedBlogTitle("");
    setEditedBlogContent("");
    setEditedBlogAuthor("");
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
          <div className="form-group">
            <label htmlFor="image">Ảnh:</label>
            <input type="file" id="image" onChange={handleImageChange} />
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