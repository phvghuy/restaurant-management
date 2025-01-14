# UIT-VNU-IE104.P11.CNVN

## Giới Thiệu Tổng Quan

UIT-VNU-IE104.P11.CNVN là đồ án cuối kỳ môn IE104 - Internet và công nghệ Web của nhóm sinh viên của trường Đại học Công nghệ Thông tin - ĐHQG. Đồ án này được thực hiện bởi nhóm 12, lớp IE104.P11.CNVN dưới sự hướng dẫn của Th.S Võ Tấn Khoa. Đây là một trang web quản lý nhà hàng Nhật Bản.

## Thành Viên Nhóm

Các thành viên trong nhóm bao gồm:

| STT | Tên                | Mã Số Sinh Viên | Vai Trò    |
| --- | ------------------ | --------------- | ---------- |
| 1   | Phạm Võ Gia Huy    | 22520572       | Trưởng nhóm |
| 2   | Nguyễn Tấn Cao Hào | 22520402       | Thành Viên  |
| 3   | Đỗ Thành Danh      | 22520198       | Thành Viên  |
| 4   | Đinh Quốc Huy      | 22520535       | Thành Viên  |
| 5   | Phạm Hải Dương     | 22520309       | Thành Viên  |

## Công nghệ sử dụng

 - Ngôn ngữ:  JavaScript, CSS
 - Framework: React, NodeJS, ExpressJS
 - Database: MongoDB
 - Công cụ khác: Swagger, Thunder Client, Redux Toolkit, ...

## Cài Đặt

### Yêu Cầu Hệ Thống

-   Cài đặt NodeJS phiên bản 22.11.0 trở lên.

### Hướng Dẫn Cài Đặt

**Bước 1:** Clone repo về máy tính của bạn bằng cách sử dụng git command line hoặc download zip file.

```bash
git clone https://github.com/phvghuy/restaurant-management.git
```

**Bước 2:** Di chuyển vào thư mục backend dự án.

```bash
cd restaurant-management/backend
```
**Bước 3:** Cài đặt các dependencies.

```bash
npm install
```
**Bước 4:** Tạo file .env trong thư mục backend
```bash
MONGODB_URL=mongodb+srv://<db_username>:<db_password>@cluster0.mc7rj.mongodb.net/restaurant-management?retryWrites=true&w=majority&appName=Cluster0
```
Lưu ý: muốn điền <db_username>:<db_password> trước tiên phải được thêm email vào database và tạo user databse (liên hệ trưởng nhóm để được thêm vào)
![image](https://github.com/user-attachments/assets/d1abcc6a-f80e-4924-8dc0-908ed1a62419)


**Bước 5:** Di chuyển vào thư mục frontend dự án.

```bash
cd restaurant-management/frontend
```
**Bước 6:** Cài đặt các dependencies.

```bash
npm install
```
**Bước 7:** Khởi chạy server (cả bên backend và frontend)
- Bên backend:
```bash
cd restaurant-management/backend
npm start
```
- Bên frontend:
```bash
cd restaurant-management/frontend
npm start
```

## Cấu trúc thư mục

```text
restaurant-management
│
├───backend                              # Thư mục chứa source code backend
│   ├───config                           # Thư mục chứa các file cấu hình (dữ liệu mẫu, cấu hình database, ...)
│   ├───controllers                      # Thư mục chứa các file controller
│   ├───middlewares                      # Thư mục chứa các file middleware
│   ├───models                           # Thư mục chứa các file model
│   ├───routers                          # Thư mục chứa các file router
│   ├───app.js                           # File chạy ứng dụng
│   └───package.json                     # File quản lý các thư viện, scripts
└───frontend                             # Thư mục chứa source code frontend
     ├───public                          # Thư mục chứa các file tĩnh
     │   └───images                      # Thư mục chứa các hình ảnh
     ├───src                             # Thư mục chứa mã nguồn chính của frontend
     │   ├───assets                      # Thư mục chứa các file assets (hình ảnh, fonts, v.v.)
     │   ├───components                  # Thư mục chứa các components
     │   ├───pages                       # Thư mục chứa các pages
     │   ├───redux                       # Thư mục chứa các file redux (state management)
     │   ├───services                    # Thư mục chứa các file services (gọi API, xử lý logic, v.v.)
     │   ├───App.css                     # File css chính
     │   ├───App.js                      # File component chính
     │   └───index.js                    # File khởi tạo ứng dụng (entry point)
     └───package.json                    # File quản lý các thư viện, scripts
```
## Demo Video:
[Link Demo Video](https://drive.google.com/file/d/1hmsgm6AZmsczpHBC_lUUoM_UDxvihV1J/view?usp=sharing)

## Screenshot:

### Trang chủ
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/homepage.jpeg?raw=true)

### Đăng nhập/đăng ký
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/login.jpeg?raw=true)
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/register.jpeg?raw=true)
- Xác thực email sau khi đăng ký tài khoản
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/verifyEmail.jpeg?raw=true)

### Quên mật khẩu
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/forgotPassword.jpeg?raw=true)
- Link Reset Password trong email
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/ResetPasswordEmail.jpeg?raw=true)
![image_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/forgonPasswordPage.jpeg?raw=true)

### Menu
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/menu.jpeg?raw=true)

### Đặt bàn
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/reservation.jpeg?raw=true?raw=true)

### Tin tức
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/blog.jpeg?raw=true)

### Liên hệ
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/about.jpeg?raw=true)

### Thông tin tài khoản
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/account.jpeg?raw=true)

### Trang chủ (ADMIN)
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/HomePageAdmin.jpeg?raw=true)

### Đặt bàn (ADMIN)
- Thêm, xóa, chỉnh sửa đặt bàn
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/reservationAdmin.jpeg?raw=true)
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/AddReservationAdmin.jpeg?raw=true)
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/EditReservationAdmin.jpeg?raw=true)

### Tin tức (ADMIN)
- Thêm, xóa, chỉnh sửa tin tức
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/AddBlogAdmin.jpeg?raw=true)
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/editBlogAdmin.jpeg?raw=true)

### Thông tin nhân viên
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/employeeAdmin.jpeg?raw=true)

### Thông tin ADMIN
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/infoAdmin.jpeg?raw=true)

### Database (MongoDB)
![iamge_alt](https://github.com/phvghuy/restaurant-management/blob/main/screenshot/database.png?raw=true)
