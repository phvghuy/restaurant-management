// frontend/src/pages/BlogPageAdmin/BlogPageAdmin.js
import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import "../BlogPageAdmin/BlogPageAdmin.css";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import CreateBlogPopup from "../../components/CreateBlogPopup/CreateBlogPopup";
import EditBlogPopup from "../../components/EditBlogPopup/EditBlogPopup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const BlogPageAdmin = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.blogs.allBlogs);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tạo instance axiosJWT
  const axiosJWT = axios.create();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/v1/auth/refresh", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Interceptor cho axiosJWT
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < currentDate.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    // Chỉ gọi getAllBlogs nếu user là admin và có accessToken
    if (user?.admin && accessToken) {
      getAllBlogs(accessToken, dispatch, axiosJWT).catch((err) => {
        console.error("Failed to fetch blogs:", err);
        // Xử lý lỗi, ví dụ hiển thị thông báo cho người dùng
        alert("Failed to fetch blogs. Please try again later.");
      });
    }
  }, [accessToken, dispatch, user]);

  const handleCreateClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateBlogSuccess = () => {
    setShowCreateForm(false);
    getAllBlogs(accessToken, dispatch, axiosJWT).catch((err) => {
      console.error("Failed to fetch blogs:", err);
      alert("Failed to fetch blogs. Please try again later.");
    });
  };

  const handleClosePopup = () => {
    setShowCreateForm(false);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
      try {
        setIsSubmitting(true); // Bắt đầu quá trình xóa
        await deleteBlog(postId, accessToken, dispatch, axiosJWT);
        alert("Blog đã được xóa thành công!");
        getAllBlogs(accessToken, dispatch, axiosJWT).catch((err) => {
          console.error("Failed to fetch blogs:", err);
          alert("Failed to fetch blogs. Please try again later.");
        });
      } catch (err) {
        console.error(err);
        alert(`Xóa Blog thất bại: ${err}`);
      } finally {
        setIsSubmitting(false); // Kết thúc quá trình xóa
      }
    }
  };

  const handleEdit = (postId) => {
    const blogToEdit = allBlogs.find((blog) => blog._id === postId);
    setSelectedBlog(blogToEdit);
    setShowEditForm(true);
  };

  const handleEditBlogSuccess = () => {
    alert("Blog đã được cập nhật thành công");
    setShowEditForm(false);
    getAllBlogs(accessToken, dispatch, axiosJWT).catch((err) => {
      console.error("Failed to fetch blogs:", err);
      alert("Failed to fetch blogs. Please try again later.");
    });
  };

  const handleCloseEditPopup = () => {
    setShowEditForm(false);
  };

  // Kiểm tra nếu user không phải là admin thì không hiển thị trang
  if (!user?.admin) {
    return (
      <div className="not-authorized">
        <h1>403 - Forbidden</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="blog-container">
        <h1 className="blog-title">Blog</h1>
        {/* Di chuyển EditBlogPopup ra ngoài div có điều kiện */}
        <EditBlogPopup
          isOpen={showEditForm}
          onClose={handleCloseEditPopup}
          onSuccess={handleEditBlogSuccess}
          blog={selectedBlog}
          axiosJWT={axiosJWT}
        />
        {user?.admin && (
          <div className="blog-create">
            <button
              className="create-button"
              onClick={handleCreateClick}
              disabled={isSubmitting}
            >
              + Tạo bài viết mới
            </button>
            <CreateBlogPopup
              isOpen={showCreateForm}
              onClose={handleClosePopup}
              onSuccess={handleCreateBlogSuccess}
              axiosJWT={axiosJWT}
            />
          </div>
        )}
        <div className="blog-posts">
          {allBlogs &&
            allBlogs.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                date={new Date(post.createdAt).toLocaleDateString()}
                content={post.content}
                author={post.author}
                imageUrl={post.imageUrl}
                postId={post._id}
                accessToken={accessToken}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isAdmin={user?.admin}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPageAdmin;