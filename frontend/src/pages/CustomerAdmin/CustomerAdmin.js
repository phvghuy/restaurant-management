import React from 'react';
import './CustomerAdmin.css';

const CustomerReport = () => {
  return (
    <div className="customer-report">
      <h2 className="report-title">Báo cáo khách hàng</h2>

      <div className="ranking-section">
        <h3 className="section-title">XẾP HẠNG</h3>
        <p className="update-time">
          <span className="material-symbols-outlined"></span>
          updated 4 min ago
        </p>

        <table className="ranking-table">
          <thead>
            <tr>
              <th>Giá trị xếp hạng</th>
              <th>Khách hàng</th>
              <th>Số lượng thành viên</th>
              <th>Chiếm khoảng %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20,000$ trở lên</td>
              <td>
                <div className="customer-avatars">
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                </div>
              </td>
              <td>30</td>
              <td>
                <div className="progress-bar green" style={{ width: '15%' }}></div>
              </td>
            </tr>
            <tr>
              <td>15,000$-20,000$</td>
              <td>
                <div className="customer-avatars">
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                </div>
              </td>
              <td>20</td>
              <td>
                <div className="progress-bar green" style={{ width: '30%' }}></div>
              </td>
            </tr>
            <tr>
              <td>10,000$-15,000$</td>
              <td>
                <div className="customer-avatars">
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                </div>
              </td>
              <td>10</td>
              <td>
                <div className="progress-bar green" style={{ width: '10%' }}></div>
              </td>
            </tr>
            <tr>
              <td>5,000$-10,000$</td>
              <td>
                <div className="customer-avatars">
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                </div>
              </td>
              <td>200</td>
              <td>
                <div className="progress-bar green" style={{ width: '55%' }}></div>
              </td>
            </tr>
            <tr>
              <td>0-5,000$</td>
              <td>
                <div className="customer-avatars">
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                  <img src="/images/chef.png" alt="avatar" />
                </div>
              </td>
              <td>400</td>
              <td>
                <div className="progress-bar green" style={{ width: '85%' }}></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="stats-section">
        <div className="total-value">
          <h3 className="section-title">Đánh giá tổng quan</h3>
          <p className="increase">
            <span className="material-symbols-outlined"></span>
            +24% this month
          </p>
          <div className="star-rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="star-item">
                <span className="material-symbols-outlined star-icon">{star}   
                <img src="/images/star.png" alt="Star" className="star-image" />
                </span>
                <span className="star-text">
                  {star === 5 && '22 DEC 7:20 PM'}
                  {star === 4 && '21 DEC 11 PM'}
                  {star === 3 && '21 DEC 9:34 PM'}
                  {star === 2 && '20 DEC 2:20 AM'}
                  {star === 1 && '18 DEC 4:54 AM'}
                </span>
                <div className="progress-bar blue" style={{ width: star === 5 ? '50%' : star === 4 ? '30%' : star === 3 ? '20%' : star === 2 ? '10%' : '5%' }}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-satisfaction">
          <div className="booking">
            <span className="material-symbols-outlined sofa-icon">
            </span>
            <p className="booking-text">
              <span className="bold">Số lượng đặt bàn  </span>
            </p>
            <p className="increase-booking">
              <span className="green-text">+55%</span> than lask week
            </p>
          </div>
          <div className="satisfaction">
            <span className="material-symbols-outlined stats-icon">
            </span>
            <p className="satisfaction-text">
              <span className="bold">Mức độ hài lòng</span>
            </p>
            <p className="increase-satisfaction">
              <span className="blue-text">+3%</span> than last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReport;