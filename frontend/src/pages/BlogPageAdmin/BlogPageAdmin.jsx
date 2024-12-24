// frontend/src/pages/BlogPageAdmin/BlogPageAdmin.js
import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import '../BlogPageAdmin/BlogPageAdmin.css';
import { getAllBlogs, createBlog, deleteBlog, updateBlog } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlogPopup from '../../components/CreateBlogPopup/CreateBlogPopup';
import EditBlogPopup from '../../components/EditBlogPopup/EditBlogPopup';

const BlogPageAdmin = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.blogs.allBlogs);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (accessToken) {
      getAllBlogs(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const handleCreateClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateBlogSuccess = () => {
    alert('Blog created successfully!');
    setShowCreateForm(false);
    getAllBlogs(accessToken, dispatch);
  };

  const handleClosePopup = () => {
    setShowCreateForm(false);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa blog này?')) {
      try {
        await deleteBlog(postId, accessToken, dispatch);
        alert('Blog deleted successfully!');
        getAllBlogs(accessToken, dispatch);
      } catch (err) {
        console.error(err);
        alert('Failed to delete blog!');
      }
    }
  };

  const handleEdit = (postId) => {
    const blogToEdit = allBlogs.find((blog) => blog._id === postId);
    setSelectedBlog(blogToEdit);
    setShowEditForm(true);
  };

  const handleEditBlogSuccess = () => {
    alert('Blog updated successfully!');
    setShowEditForm(false);
    getAllBlogs(accessToken, dispatch);
  };

  const handleCloseEditPopup = () => {
    setShowEditForm(false);
  };

  return (
    <div>
      <div className="blog-container">
        <h1 className="blog-title">Blog</h1>
        {user?.admin && (
          <div className="blog-create">
            <button className="create-button" onClick={handleCreateClick}>
              + Tạo bài viết mới
            </button>
            <CreateBlogPopup
              isOpen={showCreateForm}
              onClose={handleClosePopup}
              onSuccess={handleCreateBlogSuccess}
            />
            <EditBlogPopup
              isOpen={showEditForm}
              onClose={handleCloseEditPopup}
              onSuccess={handleEditBlogSuccess}
              blog={selectedBlog}
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
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPageAdmin;