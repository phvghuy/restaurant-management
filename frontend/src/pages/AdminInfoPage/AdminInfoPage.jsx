//frontend/pages/AdminInfoPage/AdminInfoPage.jsx
import React, { useState } from 'react';
import styles from './AdminInfoPage.module.css'; // Import CSS Modules

const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState('userInfo');
    const [role, setRole] = useState('active'); // Mặc định chọn nhân viên
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.employeeProfile}>
                <div className={styles.employeeCard}>
                    <div className={styles.profileAvatar}>
                        <img src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg" alt="Employee Avatar" />
                    </div>

                    <div className={styles.employeeId}>C-HaoNguyen</div>

                    <div className={styles.employeeRole}>Quản trị viên</div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>👤</span>
                        <span>Nguyễn Tấn Cao Hào</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📞</span>
                        <span>0123456789</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📧</span>
                        <span>example@gmail.com</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📅</span>
                        <span>Ngày tạo tài khoản: 01/01/2024</span>
                    </div>
                </div>

                <div className={styles.employeeInfo}>
                    <div className={styles.tabHeader}>
                        <button
                            className={`${styles.tabItem} ${activeTab === 'userInfo' ? styles.active : ''}`}
                            onClick={() => setActiveTab('userInfo')}
                        >
                            Thông tin người dùng
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'userInfo' && (
                            <div className={styles.userInfoTab}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Tên người dùng:</label>
                                    <input type="text" value="C-HaoNguyen" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Họ và tên</label>
                                    <input type="text" value="Nguyễn Tấn Cao Hào" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Email</label>
                                    <input type="email" value="example@gmail.com" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Số điện thoại</label>
                                    <input type="text" value="0123456789" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ngày tạo tài khoản</label>
                                    <div className={styles.inputContainer}>
                                        <input type="text" placeholder="dd/mm/yyyy" className={styles.dateInput} />
                                        <span className={styles.iconCalendar}>📅</span>
                                    </div>
                                </div>

                                <button className={styles.saveButton}>Lưu thay đổi</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.employeeProfile}>
                <div className={styles.employeeCard}>
                    <div className={styles.profileAvatar}>
                        <img src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0" alt="Employee Avatar" />
                    </div>

                    <div className={styles.employeeId}>C-HaoNguyen</div>

                    <div className={styles.employeeRole}>Người dùng</div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>👤</span>
                        <span>Nguyễn Tấn Cao Hào</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📞</span>
                        <span>0123456789</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📧</span>
                        <span>example@gmail.com</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📅</span>
                        <span>Ngày tạo tài khoản: 01/01/2024</span>
                    </div>
                </div>

                <div className={styles.employeeInfo}>
                    <div className={styles.tabHeader}>
                        <button
                            className={`${styles.tabItem} ${activeTab === 'userInfo' ? styles.active : ''}`}
                            onClick={() => setActiveTab('userInfo')}
                        >
                            Thông tin người dùng
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'userInfo' && (
                            <div className={styles.userInfoTab}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Tên người dùng:</label>
                                    <input type="text" value="C-HaoNguyen" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Họ và tên</label>
                                    <input type="text" value="Nguyễn Tấn Cao Hào" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Email</label>
                                    <input type="email" value="example@gmail.com" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Số điện thoại</label>
                                    <input type="text" value="0123456789" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ngày tạo tài khoản</label>
                                    <div className={styles.inputContainer}>
                                        <input type="text" placeholder="dd/mm/yyyy" className={styles.dateInput} />
                                        <span className={styles.iconCalendar}>📅</span>
                                    </div>
                                </div>

                                <div className={styles.roleGroup}>
                                    <label className={styles.label}>Trạng thái tài khoản:</label>

                                    <label className={styles.label}>
                                        <input
                                            type="radio"
                                            value="active"
                                            checked={role === "active"}
                                            onChange={handleRoleChange}
                                        />
                                        Hoạt động
                                    </label>

                                    <label className={styles.label}>
                                        <input
                                            type="radio"
                                            value="non-active"
                                            checked={role === "non-active"}
                                            onChange={handleRoleChange}
                                        />
                                        Không hoạt động
                                    </label>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button className={styles.deleteButton}>Xóa</button>
                                    <button className={styles.saveButton}>Lưu thay đổi</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.employeeProfile}>
                <div className={styles.employeeCard}>
                    <div className={styles.profileAvatar}>
                        <img src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0" alt="Employee Avatar" />
                    </div>

                    <div className={styles.employeeId}>C-HaoNguyen</div>

                    <div className={styles.employeeRole}>Người dùng</div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>👤</span>
                        <span>Nguyễn Tấn Cao Hào</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📞</span>
                        <span>0123456789</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📧</span>
                        <span>example@gmail.com</span>
                    </div>

                    <div className={styles.employeeDetailRow}>
                        <span className={styles.icon}>📅</span>
                        <span>Ngày tạo tài khoản: 01/01/2024</span>
                    </div>
                </div>

                <div className={styles.employeeInfo}>
                    <div className={styles.tabHeader}>
                        <button
                            className={`${styles.tabItem} ${activeTab === 'userInfo' ? styles.active : ''}`}
                            onClick={() => setActiveTab('userInfo')}
                        >
                            Thông tin người dùng
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'userInfo' && (
                            <div className={styles.userInfoTab}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Tên người dùng:</label>
                                    <input type="text" value="C-HaoNguyen" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Họ và tên</label>
                                    <input type="text" value="Nguyễn Tấn Cao Hào" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Email</label>
                                    <input type="email" value="example@gmail.com" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Số điện thoại</label>
                                    <input type="text" value="0123456789" readOnly />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ngày tạo tài khoản</label>
                                    <div className={styles.inputContainer}>
                                        <input type="text" placeholder="dd/mm/yyyy" className={styles.dateInput} />
                                        <span className={styles.iconCalendar}>📅</span>
                                    </div>
                                </div>

                                <div className={styles.roleGroup}>
                                    <label className={styles.label}>Trạng thái tài khoản:</label>

                                    <label className={styles.label}>
                                        <input
                                            type="radio"
                                            value="active"
                                            checked={role === "active"}
                                            onChange={handleRoleChange}
                                        />
                                        Hoạt động
                                    </label>

                                    <label className={styles.label}>
                                        <input
                                            type="radio"
                                            value="non-active"
                                            checked={role === "non-active"}
                                            onChange={handleRoleChange}
                                        />
                                        Không hoạt động
                                    </label>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button className={styles.deleteButton}>Xóa</button>
                                    <button className={styles.saveButton}>Lưu thay đổi</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;