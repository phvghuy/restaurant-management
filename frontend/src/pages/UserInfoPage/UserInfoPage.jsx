import React, { useState } from 'react';
import './UserInfo.css';

const UserInfo = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [role, setRole] = useState('employee');

  const handleTabSwitch = (tab) => setActiveTab(tab);

  return (
    <div className="user-info-container">
      <div className="left-panel">
        <div className="avatar"></div>
        <p className="user-id">MSNV: NV01234</p>
        <p className="role">Quản trị viên</p>
        <ul className="user-details">
          <li>Nguyễn Tấn Cao Hảo</li>
          <li>0123456789</li>
          <li>example@gmail.com</li>
          <li>Nam</li>
          <li>Ngày sinh: 07/11/2004</li>
          <li>Ngày vào làm: 01/12/2024</li>
        </ul>
      </div>

      <div className="right-panel">
        <div className="tabs">
          <button 
            className={activeTab === 'work' ? 'active' : ''}
            onClick={() => handleTabSwitch('work')}
          >
            Thông tin làm việc
          </button>
          <button 
            className={activeTab === 'personal' ? 'active' : ''}
            onClick={() => handleTabSwitch('personal')}
          >
            Thông tin nhân viên
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'work' && (
            <div>
              <h3>Thông tin làm việc</h3>
              <form>
                <label>Mã nhân viên</label>
                <input type="text" value="NV01234" readOnly />
                <label>Phòng</label>
                <input type="text" value="Nhân sự" readOnly />
                <label>Chức vụ</label>
                <input type="text" value="Trưởng phòng" readOnly />
                <label>Vai trò</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="role" 
                      value="employee" 
                      checked={role === 'employee'} 
                      onChange={() => setRole('employee')} 
                    />
                    Nhân viên
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="role" 
                      value="admin" 
                      checked={role === 'admin'} 
                      onChange={() => setRole('admin')} 
                    />
                    Quản trị viên
                  </label>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'personal' && (
            <div>
              <h3>Thông tin nhân viên</h3>
              <form>
                <label>Họ và tên</label>
                <input type="text" value="Nguyễn Tấn Cao Hảo" readOnly />
                <label>Giới tính</label>
                <select value="Nam" disabled>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                <label>Ngày sinh</label>
                <input type="text" value="07/11/2004" readOnly />
                <label>Email</label>
                <input type="email" value="example@gmail.com" readOnly />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
