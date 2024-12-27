// frontend/src/pages/BlogPage/Blog.js
import React, { useEffect } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import '../BlogPage/Blog.css';
import { getAllBlogs } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const Blog = () => {
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.blogs.allBlogs);

  useEffect(() => {
    getAllBlogs(null, dispatch); // Không cần accessToken vì đây là trang public
  }, [dispatch]);

  return (
    <div className="contact-container">
      <header className="contact-header">
          <h1 className="contact-title">Tin tức</h1>
      </header>
      <main className="blog-main">
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
                 isAdmin={false} // Truyền isAdmin={false} cho người dùng thường
               />
             ))}
         </div>
      </main>
    </div>
  );
};

export default Blog;