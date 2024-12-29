// frontend/src/pages/ReservationAdmin/ReservationAdmin.js
import React, { useState, useEffect } from 'react';
import styles from './ReservationAdmin.module.css';
import { FaSearch, FaTimes } from 'react-icons/fa';
import CreateReservationPopup from '../../components/CreateReservationPopup/CreateReservationPopup';
import ReservationInfoPopup from '../../components/ReservationInfoPopup/ReservationInfoPopup';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllReservations,
  deleteReservation,
  updateReservation,
} from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

const ReservationAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [isCreateReservationPopupOpen, setIsCreateReservationPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const isCreateSuccess = useSelector((state) => state.reservations.createReservation?.success);
  const [refreshReservations, setRefreshReservations] = useState(false);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (accessToken) {
          const response = await getAllReservations(accessToken, dispatch, axiosJWT);
          console.log('Reservations fetched:', response);
          if (Array.isArray(response)) {
            setReservations(response);
          } else {
            console.error('Response is not an array:', response);
            setReservations([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
        alert('Failed to fetch reservations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    if (refreshReservations) {
      setRefreshReservations(false);
    }
  }, [accessToken, dispatch, refreshReservations]);

  const filteredReservations = isLoading
    ? []
    : reservations
        .filter(
          (reservation) =>
            reservation?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation?.phoneNumber?.includes(searchTerm) ||
            reservation?._id?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .filter((reservation) => filterStatus === 'Tất cả' || reservation.status === filterStatus);

  const handleOpenCreateReservationPopup = () => setIsCreateReservationPopupOpen(true);
  const handleCloseCreateReservationPopup = () => {
    setIsCreateReservationPopupOpen(false);
    setRefreshReservations(true);
  };
  const handleOpenInfoPopup = (reservation) => {
    setSelectedReservation(reservation);
    setIsInfoPopupOpen(true);
  };
  const handleCloseInfoPopup = () => setIsInfoPopupOpen(false);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDeleteReservation = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bàn?')) {
      try {
        await deleteReservation(id, accessToken, axiosJWT);
        setReservations(reservations.filter((reservation) => reservation._id !== id));
        alert('Xóa bàn thành công!');
      } catch (error) {
        console.error('Xóa bàn thất bại:', error);
        alert(error);
      }
    }
  };

  const handleUpdateReservation = async (id, updatedData) => {
    try {
      const updatedReservation = await updateReservation(id, updatedData, accessToken, axiosJWT);
      setReservations(
        reservations.map((reservation) => (reservation._id === id ? updatedReservation : reservation)),
      );
      handleCloseInfoPopup();
      alert('Cập nhật bàn thành công!');
    } catch (error) {
      console.error('Cập nhật bàn thất bại:', error);
      alert(error);
    }
  };

  return (
    <div className={styles.reservationAdminContainer}>
      <div className={styles.contentHeader} />
      <h1 className={styles.pageTitle}>Quản lý đặt bàn</h1>

      <div className={styles.buttonContainer}>
        <div className={styles.addReservationAndSearchBar}>
          <button className={styles.addReservationButton} onClick={handleOpenCreateReservationPopup}>
            + Thêm đặt bàn
          </button>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Tìm kiếm đặt bàn nhanh..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && <FaTimes className={styles.clearIcon} onClick={() => setSearchTerm('')} />}
          </div>
        </div>
        <div className={styles.filterAndSearchContainer}>
          <div className={styles.filterButtons}>
            {['Tất cả', 'Chờ xử lý', 'Hoàn thành', 'Đã hủy'].map((status) => (
              <button
                key={status}
                className={filterStatus === status ? styles.active : ''}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.reservationsList}>
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <div className={styles.reservationItem} key={reservation._id}>
              <div className={styles.reservationDetails}>
                <p>
                  <span className={styles.label}>Khách hàng:</span> {reservation.Name}
                </p>
                <p>
                  <span className={styles.label}>Số điện thoại:</span> {reservation.phoneNumber}
                </p>
                <p>
                  <span className={styles.label}>Số người:</span> {reservation.numberOfPeople}
                </p>
                <p>
                  <span className={styles.label}>Ngày chọn đặt bàn:</span>{' '}
                  {new Date(reservation.reservationDate).toLocaleString('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
                <p>
                  <span className={styles.label}>Ngày tạo:</span>{' '}
                  {new Date(reservation.createdAt).toLocaleString('vi-VN')}
                </p>
                <p>
                  <span className={styles.label}>ID:</span> {reservation._id}
                </p>
                <p>
                  <span className={styles.label}>Lời nhắn:</span> {reservation.message}
                </p>
                <p>
                  <span className={styles.label}>Trạng thái:</span> {reservation.status}
                </p>
              </div>
              <div className={styles.reservationActions}>
                <button className={styles.checkButton} onClick={() => handleOpenInfoPopup(reservation)}>
                  Kiểm tra đặt bàn
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>

      <CreateReservationPopup
        isOpen={isCreateReservationPopupOpen}
        onClose={handleCloseCreateReservationPopup}
        axiosJWT={axiosJWT}
      />

      {isInfoPopupOpen && (
        <ReservationInfoPopup
          isOpen={isInfoPopupOpen}
          onClose={handleCloseInfoPopup}
          reservation={selectedReservation}
          onUpdate={handleUpdateReservation}
          onDelete={handleDeleteReservation}
        />
      )}
    </div>
  );
};

export default ReservationAdmin;