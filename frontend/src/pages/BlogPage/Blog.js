import React from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import '../BlogPage/Blog.css'
import SushiImageBlog from '../../assets/image/sushi-blog.png'

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản',
            date: 'July 9, 2024',
            imageUrl: (SushiImageBlog)
        },
        
        { 
            id: 2, 
            title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản', 
            date: 'July 9, 2024', 
            imageUrl: (SushiImageBlog)
        },
        
        { 
            id: 3, 
            title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản', 
            date: 'July 9, 2024', 
            imageUrl: (SushiImageBlog)
        },
        
        { 
            id: 4, 
            title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản', 
            date: 'July 9, 2024', 
            imageUrl: (SushiImageBlog)
        },
        
    ];

    return (
        <div>
            <div className="blog-container">
                <header className="contact-header">
                    <h1 className="blog-title">Blog</h1>
                </header>
                <div className="blog-posts">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} title={post.title} date={post.date} imageUrl={post.imageUrl} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;