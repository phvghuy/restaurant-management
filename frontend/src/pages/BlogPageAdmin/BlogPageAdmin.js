import React from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import '../BlogPageAdmin/BlogPageAdmin.css';

const BlogPageAdmin = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản',
            date: 'July 9, 2024',
            imageUrl: '/images/sushi-blog.jpg'
        },
        { id: 2, title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản', date: 'July 9, 2024', imageUrl: '/images/sushi-blog.jpg' },
        { id: 3, title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản', date: 'July 9, 2024', imageUrl: '/images/sushi-blog.jpg' },
        { id: 4, title: 'Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản', date: 'July 9, 2024', imageUrl: '/images/sushi-blog.jpg' },
    ];

    return (
        <div>
            {/* <Navbar currentPage="blog" /> */}
            <div className="blog-container">
                <h1 className="blog-title">Blog</h1>
                <div className="blog-create">
                    <button className="create-button">+ Tạo bài viết mới</button>
                </div>
                <div className="blog-posts">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} title={post.title} date={post.date} imageUrl={post.imageUrl} />
                    ))}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default BlogPageAdmin;
