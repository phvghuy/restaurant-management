import React, { useState } from 'react';
import './UserInfoPage.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('userInfo');
  return (
    <div className="employee-profile">
      <div className="employee-card">
        <div className="profile-avatar">
          <img src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0" alt="Employee Avatar" />
        </div>
        <div className="employee-id">C-HaoNguyen</div>
        <div className="employee-role">
          <span className="arrow">Người dùng</span>
        </div>
        <div className="employee-details">
          <div className="employee-detail-row">
            <span className="icon">👤</span>
            <span>Nguyễn Tấn Cao Hào</span>
          </div>
          <div className="employee-detail-row">
            <span className="icon">📞</span>
            <span>0123456789</span>
          </div>
          <div className="employee-detail-row">
            <span className="icon">📧</span>
            <span>example@gmail.com</span>
          </div>
           <div className="employee-detail-row">
            <span className="icon">📅</span>
            <span>Ngày tạo tài khoản: 01/01/2024</span>
          </div>
        </div>
      </div>
        <div className="employee-info">
        <div className="tab-header">
          <button
             className={`tab-item ${activeTab === 'userInfo' ? 'active' : ''}`}
            onClick={() => setActiveTab('userInfo')}
          >
            Thông tin người dùng
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'userInfo' && (
            <div className="user-info-tab">
                  <div className="input-group">
                    <label>Tên người dùng</label>
                    <input type="text" value="C-HaoNguyen" readOnly />
                  </div>
              <div className="input-group">
                    <label>Họ và tên</label>
                    <input type="text" value="Nguyễn Tấn Cao Hào" readOnly />
                  </div>
              <div className="input-group">
                    <label>Email</label>
                    <input type="email" value="example@gmail.com" readOnly />
                </div>
              <div className="input-group">
                    <label>Số điện thoại</label>
                    <input type="text" value="0123456789" readOnly />
                  </div>
              <div className="input-group">
                <label>Ngày tạo tài khoản</label>
                <div class="input-container">
                  <input type="text" placeholder="dd/mm/yyyy" className="date-input" />
                  <span className="icon-calendar">📅</span>
                </div>
              </div>
                <button className="save-button">Lưu thay đổi</button>
            </div>
          )}
          </div>
      </div>
    </div>
  );
};

export default UserProfile;