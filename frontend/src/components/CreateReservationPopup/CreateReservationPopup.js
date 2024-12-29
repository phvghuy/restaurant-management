// frontend/src/components/CreateReservationPopup/CreateReservationPopup.js
import React, { useState } from 'react';
import './CreateReservationPopup.css';

const CreateReservationPopup = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu đặt bàn đến API
    console.log('Submit reservation:', {
      customerName,
      phoneNumber,
      reservationDate,
      reservationTime,
      numberOfPeople,
      message,
    });
    onClose(); // Đóng popup sau khi submit
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="create-reservation-popup">
        <h2 className="popup-title">Thông tin thêm đặt bàn</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Họ và Tên <span className="required-star">*</span></label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập tên khách hàng"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Số điện thoại <span className="required-star">*</span></label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="ví dụ: 0983204020"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationDate">Ngày</label>
            <input
              type="date"
              id="reservationDate"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationTime">Giờ</label>
            <select
              id="reservationTime"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              required
            >
              <option value="">--:-- --</option>
              {/* Tạo các option cho giờ từ 8:00 đến 20:00 */}
              {Array.from({ length: 13 }, (_, i) => {
                const hour = i + 8; // Bắt đầu từ 8 giờ
                const formattedHour = hour.toString().padStart(2, '0'); // Định dạng thành 2 chữ số
                return (
                  <React.Fragment key={hour}>
                    <option value={`${formattedHour}:00`}>{formattedHour}:00</option>
                    <option value={`${formattedHour}:30`}>{formattedHour}:30</option>
                  </React.Fragment>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfPeople">Số người</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              placeholder="ví dụ: 5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Lời nhắn</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ghi chú lời nhắn"
            />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Quay lại
            </button>
            <button type="submit" className="submit-button">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReservationPopup;