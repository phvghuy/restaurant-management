import React, { useState } from 'react';
import './UserInfoPage.css';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('workInfo');
  const [role, setRole] = useState('staff'); // Mặc định chọn nhân viên

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="employee-profile">
      <div className="employee-card">
        <div className="profile-avatar">
          <img src="./user-avatar.jpg" alt="Employee Avatar" />
        </div>
        <div className="employee-id">MSNV: NV01234</div>
        <div className="employee-role">
          <span className="arrow">↑</span>Quản trị viên
        </div>
        <div className="employee-details">
          <div className="employee-detail-row">
            <span className="icon">👤</span>
            <span>Nguyễn Tấn Cao Hảo</span>
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
            <span className="icon">♂️</span>
            <span>Nam</span>
          </div>
          <div className="employee-detail-row">
            <span className="icon">📅</span>
            <span>Ngày sinh: 07/11/2004</span>
          </div>
          <div className="employee-detail-row">
            <span className="icon">📅</span>
            <span>Ngày vào làm: 01/12/2024</span>
          </div>
        </div>
      </div>

      <div className="employee-info">
        <div className="tab-header">
            <button 
                className={`tab-item ${activeTab === 'workInfo' ? 'active' : ''}`}
                onClick={() => handleTabChange('workInfo')}
                >
                Thông tin làm việc
            </button>
          <button 
            className={`tab-item ${activeTab === 'personalInfo' ? 'active' : ''}`}
            onClick={() => handleTabChange('personalInfo')}
          >
            Thông tin nhân viên
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'workInfo' && (
            <div className="work-info-tab">
                <div className="input-group">
                <label>Mã nhân viên</label>
                <input type="text" value="NV01234" readOnly />
                </div>
                <div className="input-group">
                    <label>Phòng</label>
                    <input type="text" value="Nhân sự" readOnly />
                </div>
                 <div className="input-group">
                     <label>Chức vụ</label>
                    <input type="text" value="Trưởng phòng" readOnly />
                 </div>
                <div className="input-group">
                    <label>Ngày vào làm</label>
                      <div class="input-container">
                        <input type="text" placeholder="dd/mm/yyyy" className="date-input" />
                        <span className="icon-calendar">📅</span>
                      </div>
                </div>
                <div className="role-group">
                  <label>Vai trò</label>
                  <label>
                      <input
                      type="radio"
                      value="staff"
                      checked={role === "staff"}
                      onChange={handleRoleChange}
                      />
                      Nhân viên
                  </label>
                  <label>
                      <input
                      type="radio"
                      value="manager"
                      checked={role === "manager"}
                      onChange={handleRoleChange}
                      />
                      Quản trị viên
                      </label>
                  </div>
            </div>
          )}
          {activeTab === 'personalInfo' && (
            <div className="personal-info-tab">
                <div className="input-group">
                    <label>Họ và tên</label>
                    <input type="text" value="Nguyễn Tấn Cao Hảo" readOnly />
                </div>

                <div className="input-group">
                  <label>Giới tính</label>
                    <div class="select-container">
                      <select>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                </div>

                <div className="input-group">
                    <label>Ngày sinh</label>
                    <input type="text" value="07/11/2004" readOnly />
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value="example@gmail.com" readOnly />
                </div>

                <div className="input-group">
                  <label>Số điện thoại</label>
                  <input type="phone" value="0123456789" readOnly />
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;