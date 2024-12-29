import React, { useState, useEffect } from 'react';
import './ReservationInfoPopup.css';

const ReservationInfoPopup = ({ isOpen, onClose, reservation }) => {
  // Sử dụng state để lưu thông tin chỉnh sửa, giá trị khởi tạo là thông tin từ reservation prop
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    // Cập nhật state khi reservation thay đổi
    if (reservation) {
      setCustomerName(reservation.customerName);
      setPhoneNumber(reservation.phoneNumber);
      // Tách riêng ngày và giờ
      const [date, time] = new Date(reservation.reservationDate).toISOString().split('T');
      setReservationDate(date);
      setReservationTime(time.substring(0, 5)); // Chỉ lấy "HH:mm"
      setNumberOfPeople(reservation.numberOfPeople);
      setMessage(reservation.message);
      setStatus(reservation.status);
    }
  }, [reservation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu cập nhật đến API
    console.log('Update reservation:', {
      customerName,
      phoneNumber,
      reservationDate,
      reservationTime,
      numberOfPeople,
      message,
      status,
      note,
    });
    onClose();
  };

  if (!isOpen || !reservation) return null;

  return (
    <div className="popup-overlay">
      <div className="reservation-info-popup">
        <h2 className="popup-title">Thông tin đặt bàn</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-column">
              {/* Các trường thông tin bên trái */}
              <div className="form-group">
                <label htmlFor="customerName">
                  Họ và Tên <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Số điện thoại <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="ví dụ: 0983204020"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reservationDate">Ngày</label>
                <input
                  type="date"
                  id="reservationDate"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reservationTime">Giờ</label>
                <input
                  type="time"
                  id="reservationTime"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="numberOfPeople">Số người</label>
                <input
                  type="number"
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  placeholder="ví dụ: 5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Lời nhắn</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="form-column">
              {/* Các trường thông tin bên phải */}
              <div className="form-group">
                <label htmlFor="status">Tình trạng đặt bàn</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Chờ xử lý">Chờ xử lý</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="note">Ghi chú</label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập ghi chú"
                />
              </div>
              {/* Nút đóng và xác nhận */}
              <div className="button-group">
                <button type="button" className="cancel-button" onClick={onClose}>
                  Quay lại
                </button>
                <button type="submit" className="submit-button">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationInfoPopup;