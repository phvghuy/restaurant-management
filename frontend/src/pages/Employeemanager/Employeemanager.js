import React, { useRef, useEffect } from 'react';
import './Employeemanager.css';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend
);

const EmployeeManager = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Số đơn hàng phục vụ',
            data: [65, 59, 80, 81, 56, 55, 40, 60, 75, 70, 50, 85],
            borderColor: '#2979ff',
            backgroundColor: 'rgba(41, 121, 255, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Doanh thu đóng góp',
            data: [28, 48, 40, 19, 86, 27, 90, 85, 70, 60, 55, 40],
            borderColor: '#ffb300',
            backgroundColor: 'rgba(255, 179, 0, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 10,
              },
              callback: function (value) {
                return '$' + value;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              font: {
                size: 10,
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="employee-manager">
      <h2 className="title">QUẢN LÝ NHÂN VIÊN</h2>
      <div className="employee-info">
        <div className="profile">
          <img src="/images/logo.png" alt="employee" className="avatar" />
          <h3 className="name">HUY DINH</h3>
          <p className="username">@huydinh</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Ca làm việc trong tháng</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">Ngày nghỉ phép</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">24,6$</span>
              <span className="stat-label">Doanh thu đóng góp</span>
            </div>
          </div>
        </div>
        <div className="form">
          <h3 className="form-title">THÔNG TIN NHÂN VIÊN</h3>
          <div className="form-group">
            <label htmlFor="fullname">Họ và tên</label>
            <input type="text" id="fullname" placeholder="DINH QUOC HUY" />
          </div>
          <div className="form-group">
            <label htmlFor="position">Chức vụ</label>
            <input type="text" id="position" placeholder="Nhân viên phục vụ" />
          </div>
          <div className="form-group">
            <label htmlFor="employeeId">Mã nhân viên</label>
            <input type="text" id="employeeId" placeholder="234234234234" />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Giới tính</label>
            <input type="text" id="gender" placeholder="Nam" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="ABCDE@GMAIL.COM " />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Ngày sinh</label>
            <input type="text" id="dob" placeholder="11/2/2000" />
          </div>

        </div>
        <div className="summary">
          <div className="summary-item order-item">
            <span className="material-symbols-outlined icon money-icon"></span>
            <p className="summary-text">
              <span className="label">Đơn hàng</span>
              <span className="value">100 đơn</span>
            </p>
            <p className="last-updated">
              <span className="material-symbols-outlined update-icon"></span>
              Cập nhật bây giờ
            </p>
          </div>
          <div className="summary-item revenue-item">
            <span className="material-symbols-outlined icon wallet-icon"></span>
            <p className="summary-text">
              <span className="label">Doanh thu</span>
              <span className="value">$1,345</span>
            </p>
            <p className="last-updated">
              <span className="material-symbols-outlined update-icon"></span>
              Ngày gần nhất
            </p>
          </div>
        </div>
      </div>
      <div className="team-members">
        <h3>Team Members</h3>
        <div className="member">
          <img src="/images/chef.png" alt="member" className="member-avatar" />
          <div className="member-info">
            <p className="member-name">DJ Khaled</p>
            <p className="member-status">
              <span className="status-dot online"></span>
              Online
            </p>
          </div>
          <span className="material-symbols-outlined more-icon"></span>
        </div>
        <div className="member">
          <img src="/images/chef.png" alt="member" className="member-avatar" />
          <div className="member-info">
            <p className="member-name">Cao Hao </p>
            <p className="member-status">
              <span className="status-dot available"></span>
              Available
            </p>
          </div>
          <span className="material-symbols-outlined more-icon"></span>
        </div>
      </div>
      <div className="bottom-section">
        <div className="work-schedule">
          <h3>Lịch làm việc</h3>
          <p className="month">Trong 1 tháng</p>
          <table className="calendar">
            <thead>
              <tr>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
                <th>Su</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td className="weekend">6</td>
                <td className="weekend">7</td>
              </tr>
              <tr>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td className="weekend">13</td>
                <td className="weekend">14</td>
              </tr>
              <tr>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td className="weekend">20</td>
                <td className="weekend">21</td>
              </tr>
              <tr>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td className="weekend">27</td>
                <td className="weekend">28</td>
              </tr>
              <tr>
                <td className="prev-month">29</td>
                <td className="prev-month">30</td>
                <td className="prev-month">31</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <p className="last-updated">
            <span className="material-symbols-outlined update-icon"></span>
            Cập nhật 2 ngày trước
          </p>
        </div>
        <div className="sales-chart">
          <h3>2024 Sales</h3>
          <p className="subtitle">Hiệu suất nhân viên</p>
          <canvas ref={chartRef} id="myChart"></canvas>
          <div className="legend">
            <div className="legend-item">
              <span className="legend-color blue"></span>
              <span className="legend-label">Số đơn hàng phục vụ</span>
            </div>
            <div className="legend-item">
              <span className="legend-color yellow"></span>
              <span className="legend-label">Doanh thu đóng góp</span>
            </div>
          </div>
          <p className="last-updated">
            <span className="material-symbols-outlined update-icon"></span>
            Cập nhật 3 phút trước
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManager;