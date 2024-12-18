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

            <footer className="blog-footer">
                <div className="footer-section">
                    <h3>AJIMAZING</h3>
                    <p>Khám phá hương vị Nhật Bản đích thực tại Ajimazing - nơi ẩm thực truyền thống hòa quyện với phong cách hiện đại</p>
                </div>
                <div className="footer-section">
                    <h3>LIÊN HỆ</h3>
                    <p>Đường Hàn Thuyên, Khu Phố 6, Thủ Đức, HCM</p>
                    <p>(+84) 12 3456 7891</p>
                    <p>info@gmail.com</p>
                </div>
                <div className="footer-section">
                    <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                    <ul>
                        <li>Chính sách bảo mật thông tin</li>
                        <li>Quy chế hoạt động</li>
                        <li>Chính sách thanh toán</li>
                        <li>Chính sách thay đổi đơn hàng</li>
                        <li>Chính sách vận chuyển</li>
                        <li>Giới thiệu sản phẩm</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Blog;
