import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <header className="contact-header">
                <div className="contact-navbar">
                    <img src="/logo.png" alt="Logo" className="contact-logo" />
                    <nav>
                        <ul>
                            <li><a href="/">Trang Chủ</a></li>
                            <li><a href="/menu">Thực Đơn</a></li>
                            <li><a href="/reservation">Đặt Bàn</a></li>
                            <li><a href="/blog">Tin Tức</a></li>
                            <li><a href="/contact">Liên Hệ</a></li>
                        </ul>
                    </nav>
                    <div className="contact-search-login">
                        <input type="text" placeholder="Tìm kiếm" />
                        <button>Đăng nhập</button>
                        <button>Đăng ký</button>
                    </div>
                </div>
                <h1 className="contact-title">Liên hệ</h1>
            </header>

            <main className="contact-main">
                <div className="contact-content">
                    <div className="contact-info">
                        <h2>Liên hệ</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        <p><span className="contact-label">Địa chỉ:</span> Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</p>
                        <p><span className="contact-label">Email:</span> ajimazingsup@gmail.com <br /> helpcenter@email.tld</p>
                        <p><span className="contact-label">Điện thoại liên lạc:</span><br />0911.111.111<br />0979.999.777</p>
                    </div>
                    <div className="contact-map">
                        <img src="/map.png" alt="Map" />
                    </div>
                </div>
            </main>

            <footer className="contact-footer">
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

export default Contact;
