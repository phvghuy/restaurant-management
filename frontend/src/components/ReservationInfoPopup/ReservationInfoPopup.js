// frontend/src/components/ReservationInfoPopup/ReservationInfoPopup.js
import React, { useState, useEffect } from 'react';
import styles from './ReservationInfoPopup.module.css'; // Sửa đổi: Import từ file .module.css

const ReservationInfoPopup = ({ isOpen, onClose, reservation, onUpdate, onDelete }) => {
  const [Name, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (reservation) {
      setCustomerName(reservation.Name);
      setPhoneNumber(reservation.phoneNumber);
      setNumberOfPeople(reservation.numberOfPeople);
      setMessage(reservation.message);
      setStatus(reservation.status || 'Chờ xử lý');
      setNote(reservation.note || '');

      if (reservation.reservationDate) {
        const dateObj = new Date(reservation.reservationDate);
        if (!isNaN(dateObj)) {
          // Chuyển đổi sang định dạng YYYY-MM-DD và múi giờ UTC+7 để hiển thị
          const year = dateObj.toLocaleString('default', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
          });
          const month = dateObj.toLocaleString('default', {
            timeZone: 'Asia/Ho_Chi_Minh',
            month: '2-digit',
          });
          const day = dateObj.toLocaleString('default', {
            timeZone: 'Asia/Ho_Chi_Minh',
            day: '2-digit',
          });
          const formattedDate = `${year}-${month}-${day}`;

          setReservationDate(formattedDate);
          setReservationTime(
            dateObj.toLocaleTimeString('vi-VN', {
              timeZone: 'Asia/Ho_Chi_Minh',
              hour: '2-digit',
              minute: '2-digit',
            }),
          );
        } else {
          console.error('Invalid reservation date:', reservation.reservationDate);
          setReservationDate('');
          setReservationTime('');
        }
      } else {
        setReservationDate('');
        setReservationTime('');
      }
    }
  }, [reservation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển đổi reservationDate và reservationTime sang UTC+0 trước khi gửi đi
    const dateObj = new Date(reservationDate); // Ngày từ input date (đã được format YYYY-MM-DD)
    const [hours, minutes] = reservationTime.split(':'); // Giờ và phút (UTC+7)

    // Set giờ và phút cho dateObj (vẫn là UTC+7)
    dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0); // Set giây và mili giây về 0

    // KHÔNG CẦN TRỪ ĐI 7 TIẾNG NỮA, GIỮ NGUYÊN GIỜ UTC+7
    // const offset = -7 * 60 * 60 * 1000; // -7 giờ * 60 phút * 60 giây * 1000 mili giây
    // const utcDate = new Date(dateObj.getTime() + offset);

    const updatedReservation = {
      Name,
      phoneNumber,
      reservationDate: dateObj.toISOString(), // Lưu ngày giờ dưới dạng UTC+7 (nhưng vẫn dùng toISOString để đảm bảo định dạng chuẩn)
      numberOfPeople,
      message,
      status,
      note,
    };

    onUpdate(reservation._id, updatedReservation);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đặt bàn này?')) {
      onDelete(reservation._id);
      onClose();
    }
  };

  if (!isOpen || !reservation) return null;

  return (
    <div className={styles.popupOverlay}> 
      <div className={styles.reservationInfoPopup}> 
        <h2 className={styles.popupTitle}> 
          Thông tin đặt bàn
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContent}> 
            <div className={styles.formColumn}> 
              {/* Các trường thông tin bên trái */}
              <div className={styles.formGroup}> 
                <label htmlFor="customerName">
                  Họ và Tên <span className={styles.requiredStar}></span> 
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={Name}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="phoneNumber">
                  Số điện thoại <span className={styles.requiredStar}></span> 
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="ví dụ: 0983204020"
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="reservationDate">Ngày đặt</label>
                <input
                  type="date"
                  id="reservationDate"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="reservationTime">Giờ</label>
                <input
                  type="time"
                  id="reservationTime"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="numberOfPeople">Số người</label>
                <input
                  type="number"
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  placeholder="ví dụ: 5"
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="message">Lời nhắn</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formColumn}> 
              {/* Các trường thông tin bên phải */}
              <div className={styles.formGroup}> 
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
              <div className={styles.formGroup}> 
                <label htmlFor="note">Ghi chú</label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập ghi chú"
                />
              </div>
              {/* Nút đóng và xác nhận */}
              <div className={styles.buttonGroup}> 
                <button
                  type="button"
                  className={styles.deleteButton} 
                  onClick={handleDelete}
                >
                  Xóa
                </button>
                <button
                  type="button"
                  className={styles.cancelButton} 
                  onClick={onClose}
                >
                  Quay lại
                </button>
                <button type="submit" className={styles.submitButton}> 
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