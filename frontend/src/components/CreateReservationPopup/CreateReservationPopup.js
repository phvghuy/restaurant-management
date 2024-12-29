// frontend/src/components/CreateReservationPopup/CreateReservationPopup.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../../redux/apiRequest";
import { resetCreateReservationState } from "../../redux/reservationSlice";
import styles from "./CreateReservationPopup.module.css";

const CreateReservationPopup = ({ isOpen, onClose, axiosJWT }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;

  const [Name, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [message, setMessage] = useState("");

  const isCreating = useSelector(
    (state) => state.reservations.createReservation.isFetching
  );
  const isCreateError = useSelector(
    (state) => state.reservations.createReservation.error
  );
  const isCreateSuccess = useSelector(
    (state) => state.reservations.createReservation.success
  );

  useEffect(() => {
    return () => {
      dispatch(resetCreateReservationState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreateError) {
      alert("Failed to create reservation. Please try again.");
      dispatch(resetCreateReservationState());
    }
    if (isCreateSuccess) {
      alert("Reservation created successfully!");
      onClose();
      setCustomerName("");
      setPhoneNumber("");
      setReservationDate("");
      setReservationTime("");
      setNumberOfPeople("");
      setMessage("");
      dispatch(resetCreateReservationState());
    }
  }, [isCreateError, isCreateSuccess, dispatch, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !Name ||
      !phoneNumber ||
      !reservationDate ||
      !reservationTime ||
      !numberOfPeople
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const [hours, minutes] = reservationTime.split(":");
    const combinedDate = new Date(reservationDate);
    combinedDate.setHours(parseInt(hours, 10));
    combinedDate.setMinutes(parseInt(minutes, 10));

    const reservationData = {
      Name,
      phoneNumber,
      reservationDate: combinedDate,
      numberOfPeople,
      message,
    };

    try {
      await createReservation(
        reservationData,
        accessToken,
        dispatch,
        axiosJWT
      );
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert(error);
    }
  };

  const handleClose = () => {
    onClose();
    setCustomerName("");
    setPhoneNumber("");
    setReservationDate("");
    setReservationTime("");
    setNumberOfPeople("");
    setMessage("");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.createReservationPopup}>
        <h2 className={styles.popupTitle}>Thông tin thêm đặt bàn</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="customerName">
              Họ và Tên <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              id="customerName"
              value={Name}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập tên khách hàng"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">
              Số điện thoại <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="ví dụ: 0983204020"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="reservationDate">Ngày</label>
            <input
              type="date"
              id="reservationDate"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="reservationTime">Giờ</label>
            <select
              id="reservationTime"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              required
            >
              <option value="">--:-- --</option>
              {Array.from({ length: 13 }, (_, i) => {
                const hour = i + 8;
                const formattedHour = hour.toString().padStart(2, "0");
                return (
                  <React.Fragment key={hour}>
                    <option value={`${formattedHour}:00`}>
                      {formattedHour}:00
                    </option>
                    <option value={`${formattedHour}:30`}>
                      {formattedHour}:30
                    </option>
                  </React.Fragment>
                );
              })}
            </select>
          </div>

          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
            <label htmlFor="message">Lời nhắn</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ghi chú lời nhắn"
            />
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isCreating}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReservationPopup;