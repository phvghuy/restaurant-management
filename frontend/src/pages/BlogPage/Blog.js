import React from 'react';
import './Blog.css';

const Blog = () => {
    return (
        <div className="blog-container">
            <header className="blog-header">
                <h1 className="blog-title">Blog</h1>
            </header>

            <main className="blog-main">
                <div className="blog-articles">
                    {[1, 2, 3, 4].map((item) => (
                        <article key={item} className="blog-article">
                            <img src="/sushi-blog.png" alt="Sushi" className="blog-image" />
                            <h2>Khám Phá Nghệ Thuật và Hương Vị Của Sushi: Hành Trình Đến Với Tinh Hoa Ẩm Thực Nhật Bản</h2>
                            <p className="blog-date">July 9, 2024</p>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Blog;
