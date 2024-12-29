// frontend/src/components/CheckReservationPopup/CheckReservationPopup.js
import React, { useState, useEffect } from 'react';
import './CheckReservationPopup.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CheckReservationPopup = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservations, setReservations] = useState([]);
  const [showResults, setShowResults] = useState(false); // Thêm state để ẩn/hiện popup kết quả

  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    // Tự động điền thông tin từ user nếu đã đăng nhập
    if (isOpen && user && user.username) { // Thêm isOpen để đảm bảo popup mở rồi mới điền
      setCustomerName(user.fullName || '');
      setPhoneNumber(user.phoneNumber || '');
    } else {
      // Reset lại state khi user đăng xuất hoặc khi popup đóng
      setCustomerName('');
      setPhoneNumber('');
    }
  }, [user, isOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // TODO: Gọi API để lấy danh sách đặt bàn dựa theo customerName và phoneNumber
    // trong 30 ngày gần nhất.
    // Ví dụ:
    try {
      const response = await axios.get('/api/reservations/check', {
        params: {
          name: customerName,
          phone: phoneNumber,
          daysAgo: 30,
        },
      });
      setReservations(response.data);
      setShowResults(true); // Hiện popup kết quả
    } catch (error) {
      console.error('Error checking reservations:', error);
      // Hiển thị thông báo lỗi
    }
  };

  const handleClose = () => {
    setShowResults(false); // Ẩn popup kết quả khi đóng popup chính
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="check-reservation-popup">
        <h2 className="popup-title">Kiểm tra danh sách đặt bàn</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="customerName">Họ và Tên</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập tên khách hàng"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={handleClose}> 
              Quay lại
            </button>
            <button type="submit" className="submit-button">
              Xác nhận
            </button>
          </div>
        </form>

        {/* Popup hiển thị kết quả */}
        {showResults && (
          <div className="results-popup">
            {/* Hiển thị danh sách đặt bàn */}
            {reservations.length > 0 ? (
              <ul>
                {reservations.map((reservation) => (
                  <li key={reservation.id}>
                    {/* Hiển thị các thông tin đặt bàn, ví dụ: */}
                    <p>Ngày: {new Date(reservation.reservationDate).toLocaleDateString()}</p>
                    <p>Giờ: {new Date(reservation.reservationDate).toLocaleTimeString()}</p>
                    <p>Số người: {reservation.numberOfPeople}</p>
                    <p>Lời nhắn: {reservation.message}</p>
                    {/* ... */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không tìm thấy đặt bàn nào.</p>
            )}
            <button type="button" onClick={() => setShowResults(false)}>
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckReservationPopup;