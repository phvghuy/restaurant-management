import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>AJIMAZING</h3>
        <p>Khám phá hương vị Nhật Bản đích thực tại Ajimazing...</p>
      </div>
      <div className="footer-section">
        <h3>Liên Hệ</h3>
        <p>  Đường Hàn Thuyên, Khu Phố 6, Thủ Đức, HCM</p>
        <p>  (+84) 12 3456 7891</p>
        <p>info@gmail.com</p>
      </div>
      <div className="footer-section">
        <h3>Hỗ Trợ Khách Hàng</h3>
        <ul>
          <li>Chính sách bảo mật</li>
          <li>Chính sách thanh toán</li>
          <li>Chính sách vận chuyển</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
