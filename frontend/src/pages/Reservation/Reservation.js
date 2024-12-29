// frontend/src/pages/Reservation/Reservation.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Reservation.css";
import { createUserReservation } from '../../redux/apiRequest';
import { useLocation, useNavigate } from "react-router-dom";
import CheckReservationPopup from "../../components/CheckReservationPopup/CheckReservationPopup";
import { resetCreateUserReservationState } from "../../redux/reservationSlice";

const Reservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    Name: "",
    numberOfPeople: 1,
    reservationDate: "",
    phoneNumber: "",
    message: "",
    time: "",
  });
  const [isCheckReservationPopupOpen, setIsCheckReservationPopupOpen] =
    useState(false);

  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.auth.login.currentUser);

  // Lấy trạng thái từ Redux store
  const createUserReservationState = useSelector(
    (state) => state.reservations.createUserReservation
  );
  // Kiểm tra xem createUserReservationState có tồn tại hay không
  const isCreating = createUserReservationState ? createUserReservationState.isFetching : false;
  const isCreateError = createUserReservationState ? createUserReservationState.error : false;
  const isCreateSuccess = createUserReservationState ? createUserReservationState.success : false;

  useEffect(() => {
    return () => {
      dispatch(resetCreateUserReservationState());
    };
  }, [dispatch]);

  useEffect(() => {
    // Kiểm tra nếu user đã đăng nhập và có thông tin
    if (user && user.username) {
      // Điền thông tin từ user vào form
      setFormData((prevData) => ({
        ...prevData,
        Name: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isCreateSuccess) {
      alert("Đặt bàn thành công!");
      // Xóa trắng các ô input
      setFormData({
        Name: "",
        numberOfPeople: 1,
        reservationDate: "",
        phoneNumber: "",
        message: "",
        time: "",
      });
      dispatch(resetCreateUserReservationState());
    }
    if (isCreateError) {
      alert("Đặt bàn thất bại. Vui lòng thử lại.");
      dispatch(resetCreateUserReservationState());
    }
  }, [isCreateSuccess, isCreateError, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo đối tượng Date mới từ ngày và giờ được chọn
    const reservationDateTime = new Date(
      `${formData.reservationDate}T${formData.time}:00`
    );

    const reservationData = {
      ...formData,
      reservationDate: reservationDateTime, // Gửi đối tượng Date mới
    };

    // Sử dụng createUserReservation thay vì createReservation
    dispatch(createUserReservation(reservationData));
  };

  const handleOpenCheckReservationPopup = () => {
    setIsCheckReservationPopupOpen(true);
  };

  const handleCloseCheckReservationPopup = () => {
    setIsCheckReservationPopupOpen(false);
  };

  return (
    <div className="reservation-container">
      <header className="reservation-header">
        <h1 className="reservation-title">Đặt bàn</h1>
      </header>

      <main className="reservation-main">
        <div className="content-wrapper">
          <div className="reservation-content">
            <div className="reservation-call-section">
              <div className="logo-container">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="reservation-logo-call"
                />
              </div>
              <h2>Đặt qua điện thoại</h2>
              <h2 className="call-title">Gọi đặt bàn</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                leo.
              </p>
              <p className="reservation-phone">Số điện thoại</p>
              <h3 className="phone-number">+ (62) 21 2002-2012</h3>
              <p className="reservation-phone">Số điện thoại</p>
              <h3 className="phone-number">+ (62) 21 2002-2012</h3>
            </div>
            <div className="reservation-form-section">
              <h2>Đặt Bàn Trực Tuyến</h2>
              <button
                type="button"
                onClick={handleOpenCheckReservationPopup}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  margin: "10px 0",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Kiểm tra danh sách đặt bàn
              </button>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="Name"
                  placeholder="Họ và Tên"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="reservationDate"
                  placeholder="Ngày"
                  value={formData.reservationDate}
                  onChange={handleChange}
                  required
                />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Giờ --</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                </select>
                <input
                  type="number"
                  name="numberOfPeople"
                  placeholder="Số lượng người"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Lời nhắn"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button type="submit" disabled={isCreating}>
                  {isCreating ? "Đang xử lý..." : "Xác nhận"}
                </button>
                {isCreateSuccess && (
                  <div className="success-message">Đặt bàn thành công!</div>
                )}
                {isCreateError && (
                  <p className="error-message">
                    Có lỗi xảy ra, vui lòng thử lại.
                  </p>
                )}
              </form>
              {/* Popup kiểm tra danh sách đặt bàn */}
              <CheckReservationPopup
                isOpen={isCheckReservationPopupOpen}
                onClose={handleCloseCheckReservationPopup}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reservation;