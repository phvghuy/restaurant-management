//frontend/Reservation/Reservation.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Reservation.css';
import { createReservation } from '../../redux/reservationSlice';

const Reservation = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        Name: '',
        numberOfPeople: 1,
        reservationDate: '',
        phoneNumber: '',
        message: '',
        time: '', 
    });

    // Lấy trạng thái từ Redux store
    const { status, error } = useSelector((state) => state.reservations);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kết hợp ngày và giờ thành một đối tượng Date duy nhất
        const dateTime = new Date(formData.reservationDate);
        const [hours, minutes] = formData.time.split(':').map(Number);
        dateTime.setHours(hours, minutes);

        const reservationData = {
          ...formData,
          reservationDate: dateTime, // Gửi đối tượng Date mới
        };

        dispatch(createReservation(reservationData));
    };

    
    return (
        <div className="reservation-container">
            <header className="reservation-header">
                <div className="reservation-navbar">
                    <img src="/logo.png" alt="Logo" className="reservation-logo" />
                    <nav>
                        <ul>
                            <li><a href="/">Trang Chủ</a></li>
                            <li><a href="/menu">Thực Đơn</a></li>
                            <li><a href="/reservation">Đặt Bàn</a></li>
                            <li><a href="/blog">Tin Tức</a></li>
                            <li><a href="/contact">Liên Hệ</a></li>
                        </ul>
                    </nav>
                    <div className="reservation-search-login">
                        <input type="text" placeholder="Tìm kiếm" />
                        <button>Đăng nhập</button>
                        <button>Đăng ký</button>
                    </div>
                </div>
                <h1 className="reservation-title">Đặt bàn</h1>
            </header>

            <main className="reservation-main">
                <div className="reservation-content">
                    <div className="reservation-call-section">
                        <h2>Gọi đặt bàn</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        <p className="reservation-phone">Số điện thoại</p>
                        <h3>+ (62) 21 2002-2012</h3>
                        <p className="reservation-phone">Số điện thoại</p>
                        <h3>+ (62) 21 2002-2012</h3>
                    </div>
                    <div className="reservation-form-section">
                        <h2>Đặt Bàn Trực Tuyến</h2>
                        <form onSubmit={handleSubmit}>
                        <input type="text" name="Name" placeholder="Họ và Tên" value={formData.Name} onChange={handleChange} required />
                            <input type="tel" name="phoneNumber" placeholder="Số điện thoại" value={formData.phoneNumber} onChange={handleChange} required />
                            <input type="date" name="reservationDate" placeholder="Ngày" value={formData.reservationDate} onChange={handleChange} required />
                            <select name="time" value={formData.time} onChange={handleChange} required>
                                <option value="">-- Giờ --</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                            </select>
                            <input type="number" name="numberOfPeople" placeholder="Số lượng người" min="1" value={formData.numberOfPeople} onChange={handleChange} required />
                            <textarea name="message" placeholder="Lời nhắn" value={formData.message} onChange={handleChange}></textarea>
                            <button type="submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Đang xử lý...' : 'Xác nhận'}
                            </button>
                            {status === 'succeeded' && (
                                <div className="success-message">
                                Đặt bàn thành công!
                                </div>
                            )}
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    </div>
                </div>
            </main>

            <footer className="reservation-footer">
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

export default Reservation;
