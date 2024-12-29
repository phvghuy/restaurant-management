// frontend/src/pages/ReservationAdmin/ReservationAdmin.js
import React, { useState, useEffect } from 'react';
import './ReservationAdmin.css';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import thêm FaTimes
import CreateReservationPopup from '../../components/CreateReservationPopup/CreateReservationPopup';
import ReservationInfoPopup from '../../components/ReservationInfoPopup/ReservationInfoPopup'; // Import ReservationInfoPopup

const ReservationAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [isCreateReservationPopupOpen, setIsCreateReservationPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state để lưu giá trị ô tìm kiếm
  const [selectedReservation, setSelectedReservation] = useState(null); // State lưu thông tin đặt bàn được chọn
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false); // State để điều khiển hiển thị popup

  useEffect(() => {
    // TODO: Thay thế bằng API call thực tế
    const mockReservations = [
      {
        id: '676b10a4fcbd4835d6e6e9eb',
        customerName: 'John Doe',
        phoneNumber: '0901234567',
        numberOfPeople: 2,
        reservationDate: '2024-12-24 11:00:00',
        message: 'Bàn gần cửa sổ',
        status: 'Chờ xử lý',
      },
      {
        id: '676b19a15e10fae41f8',
        customerName: 'Đỗ Thành Danh',
        phoneNumber: '0123456789',
        numberOfPeople: 1,
        reservationDate: '2024-12-26 11:00:00',
        message: '123',
        status: 'Chờ xử lý',
      },
      {
        id: '676b10afcbb8835d6e6e9eb',
        customerName: 'Phạm Võ Gia Huy',
        phoneNumber: '0909090909',
        numberOfPeople: 3,
        reservationDate: '2024-12-25 13:00:00',
        message: '3gasbas',
        status: 'Hoàn thành',
      },
      {
        id: '6761a7ec6aad8e77da229863',
        customerName: 'Đỗ Thành Danh',
        phoneNumber: '0123456789',
        numberOfPeople: 4,
        reservationDate: '2024-12-18 13:00:00',
        message: 'a',
        status: 'Hoàn thành',
      },
      {
        id: '67627af946769ce8ce651d0e',
        customerName: 'Phạm Võ Gia Huy',
        phoneNumber: '111000029',
        numberOfPeople: 4,
        reservationDate: '2024-12-18 07:34:17',
        message: 'fajfk',
        status: 'Đã hủy',
      },
    ];
    setReservations(mockReservations);
  }, []);

  // Hàm để lọc danh sách đặt bàn theo trạng thái và searchTerm
  const filteredReservations = reservations.filter((reservation) => {
    const nameMatch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = reservation.phoneNumber.includes(searchTerm);
    const idMatch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'Tất cả') {
      return nameMatch || phoneMatch || idMatch;
    }

    return (
      reservation.status === filterStatus &&
      (nameMatch || phoneMatch || idMatch)
    );
  });

  const handleOpenCreateReservationPopup = () => {
    setIsCreateReservationPopupOpen(true);
  };

  const handleCloseCreateReservationPopup = () => {
    setIsCreateReservationPopupOpen(false);
  };
  
// Hàm mở popup và cập nhật thông tin đặt bàn được chọn
const handleOpenInfoPopup = (reservation) => {
  setSelectedReservation(reservation);
  setIsInfoPopupOpen(true);
};
// Hàm đóng popup
const handleCloseInfoPopup = () => {
  setIsInfoPopupOpen(false);
};


  // Xử lý thay đổi ở ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="reservation-admin-container">
      <div className="content-header">
        
      </div>
      <h1 className="page-title">Quản lý đặt bàn</h1>

      <div className="button-container">
      <div className="add-reservation-and-search-bar">
        <button className="add-reservation-button" onClick={handleOpenCreateReservationPopup}>
          + Thêm đặt bàn
        </button>
        <div className="search-bar">
          {/* Ô tìm kiếm */}
          <input
            type="text"
            placeholder="Tìm kiếm đặt bàn nhanh..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm ? (
            <FaTimes className="clear-icon" onClick={() => setSearchTerm('')} />
          ) : (
            <FaSearch className="search-icon" />
          )}
        </div>
        </div>
        {/* Bộ lọc trạng thái */}
        <div className="filter-and-search-container">
          <div className="filter-buttons">
            <button
              className={filterStatus === 'Tất cả' ? 'active' : ''}
              onClick={() => setFilterStatus('Tất cả')}
            >
              Tất cả
            </button>
            <button
              className={filterStatus === 'Chờ xử lý' ? 'active' : ''}
              onClick={() => setFilterStatus('Chờ xử lý')}
            >
              Chờ xử lý
            </button>
            <button
              className={filterStatus === 'Hoàn thành' ? 'active' : ''}
              onClick={() => setFilterStatus('Hoàn thành')}
            >
              Hoàn thành
            </button>
            <button
              className={filterStatus === 'Đã hủy' ? 'active' : ''}
              onClick={() => setFilterStatus('Đã hủy')}
            >
              Đã hủy
            </button>
          </div>
        </div>
      </div>

      <div className="reservations-list">
        {filteredReservations.map((reservation) => (
          <div className="reservation-item" key={reservation.id}>
            <div className="reservation-details">
              <p>
                <span className="label">Khách hàng:</span> {reservation.customerName}
              </p>
              <p>
                <span className="label">Số điện thoại:</span> {reservation.phoneNumber}
              </p>
              <p>
                <span className="label">Số người:</span> {reservation.numberOfPeople}
              </p>
              <p>
                <span className="label">Ngày tạo:</span>{' '}
                {new Date(reservation.reservationDate).toLocaleString()}
              </p>
              <p>
                <span className="label">ID:</span> {reservation.id}
              </p>
              <p>
                <span className="label">Lời nhắn:</span> {reservation.message}
              </p>
            </div>
            <div className="reservation-actions">
              {reservation.status === 'Chờ xử lý' && (
                <>
                  <button className="status-button" style={{ backgroundColor: '#FFC107' }}>
                    Chờ xử lý
                  </button>
                  <button className="check-button" onClick={() => handleOpenInfoPopup(reservation)}>
                Kiểm tra đặt bàn
              </button>
                </>
              )}
              {reservation.status === 'Hoàn thành' && (
                <>
                  <button className="status-button" style={{ backgroundColor: '#28A745' }}>
                    Hoàn thành
                  </button>
                  <button className="check-button" onClick={() => handleOpenInfoPopup(reservation)}>
                Kiểm tra đặt bàn
              </button>
                </>
              )}
              {reservation.status === 'Đã hủy' && (
                <>
                  <button className="status-button" style={{ backgroundColor: '#DC3545' }}>
                    Đã hủy
                  </button>
                  <button className="check-button" onClick={() => handleOpenInfoPopup(reservation)}>
                Kiểm tra đặt bàn
              </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Popup thêm đặt bàn */}
      <CreateReservationPopup
        isOpen={isCreateReservationPopupOpen}
        onClose={handleCloseCreateReservationPopup}
      />

      {/* Popup thông tin đặt bàn */}
      {isInfoPopupOpen && (
        <ReservationInfoPopup
          isOpen={isInfoPopupOpen}
          onClose={handleCloseInfoPopup}
          reservation={selectedReservation}
        />
      )}
    </div>
    
  );
};

export default ReservationAdmin;