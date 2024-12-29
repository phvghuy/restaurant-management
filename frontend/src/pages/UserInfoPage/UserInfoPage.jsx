import React, { useState, useEffect } from 'react';
import styles from './UserInfoPage.module.css'; // Import file module CSS
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('userInfo');
  const [userInfo, setUserInfo] = useState(null);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const accessToken = currentUser?.accessToken;
  const dispatch = useDispatch();

  // Tạo axiosJWT bên ngoài useEffect
  let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosJWT.get('/v1/user/getUser', {
          headers: { token: `Bearer ${accessToken}` },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken, dispatch]); // Thêm dispatch vào dependency array

  return (
    <div className={styles.employeeProfile}>
      <div className={styles.employeeCard}>
        <div className={styles.profileAvatar}>
          <img
            src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0"
            alt="Employee Avatar"
          />
        </div>
        <div className={styles.employeeId}>{userInfo?.username}</div>
        <div className={styles.employeeRole}>
          <span className={styles.arrow}>Người dùng</span>
        </div>
        <div className={styles.employeeDetails}>
          <div className={styles.employeeDetailRow}>
            <span className={styles.icon}>👤</span>
            <span>{userInfo?.fullName}</span>
          </div>
          <div className={styles.employeeDetailRow}>
            <span className={styles.icon}>📞</span>
            <span>{userInfo?.phoneNumber}</span>
          </div>
          <div className={styles.employeeDetailRow}>
            <span className={styles.icon}>📧</span>
            <span>{userInfo?.email}</span>
          </div>
          <div className={styles.employeeDetailRow}>
            <span className={styles.icon}>📅</span>
            <span>
              Ngày tạo tài khoản:{' '}
              {userInfo?.createdAt
                ? new Date(userInfo.createdAt).toLocaleDateString('vi-VN')
                : ''}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.employeeInfo}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabItem} ${
              activeTab === 'userInfo' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('userInfo')}
          >
            Thông tin người dùng
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'userInfo' && (
            <div className={styles.userInfoTab}>
              <div className={styles.inputGroup}>
                <label>Tên người dùng</label>
                <input type="text" value={userInfo?.username || ''} readOnly />
              </div>
              <div className={styles.inputGroup}>
                <label>Họ và tên</label>
                <input type="text" value={userInfo?.fullName || ''} readOnly />
              </div>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" value={userInfo?.email || ''} readOnly />
              </div>
              <div className={styles.inputGroup}>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  value={userInfo?.phoneNumber || ''}
                  readOnly
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Ngày tạo tài khoản</label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    value={
                      userInfo?.createdAt
                        ? new Date(userInfo.createdAt).toLocaleDateString(
                            'vi-VN'
                          )
                        : ''
                    }
                    className={styles.dateInput}
                    readOnly
                  />
                  <span className={styles.iconCalendar}>📅</span>
                </div>
              </div>
              <button className={styles.saveButton}>Lưu thay đổi</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;