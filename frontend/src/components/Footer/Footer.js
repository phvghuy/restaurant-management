import React from 'react';
import { FaFacebook, FaDiscord, FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline, IoMail } from "react-icons/io5";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="contact-footer">
                <div className="footer-section">
                    <h3>AJIMAZING</h3>
                    <p>Khám phá hương vị Nhật Bản đích thực tại Ajimazing - nơi ẩm thực truyền thống hòa quyện với phong cách hiện đại</p>
                </div>
                <div className="footer-section">
                    <h3>LIÊN HỆ</h3>
                    <p><FaFacebook /> Facebook</p>
                    <p><FaDiscord /> Discord</p>
                    <p><IoLocationOutline /> Đường Hàn Thuyên, Khu Phố 6, Thủ Đức, HCM</p>
                    <p><FaPhoneAlt /> (+84) 12 3456 7891</p>
                    <p><IoMail /> info@gmail.com</p>
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
    );
};

export default Footer;
