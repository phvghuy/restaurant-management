import React, { useState } from 'react';
import './BookingForm.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đặt bàn thành công! 
Tên: ${formData.name} 
Số điện thoại: ${formData.phone} 
Số người: ${formData.guests} 
Ngày đặt bàn: ${formData.date}`);
  };

  return (
    <div className="booking-form-container">
      <img
        src="https://photo.znews.vn/w360/Uploaded/spuoasr/2022_10_11/jakub_dziubak_iOHJKJqO6E0_unsplash.jpg" 
        alt="Sushi Table"
        className="sushi-image"
      />
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Tên:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên của bạn"
            required
          />
        </label>
        <label>
          Số điện thoại:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            required
          />
        </label>
        <label>
          Số người:
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
          >
            <option value="">Chọn số người</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5+</option>
          </select>
        </label>
        <label>
          Ngày đặt bàn:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Yêu cầu khác:
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            placeholder="Yêu cầu khác"
          ></textarea>
        </label>
        <button type="submit" className="submit-btn">Xác nhận đặt bàn</button>
      </form>
    </div>
  );
}

export default BookingForm;
