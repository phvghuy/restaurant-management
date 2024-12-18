# UIT-VNU-IE104.P11.CNVN

## Giới Thiệu Tổng Quan

UIT-VNU-IE104.P11.CNVN là đồ án cuối kỳ môn IE104 - Internet và công nghệ Web của nhóm sinh viên của trường Đại học Công nghệ Thông tin - ĐHQG. Đồ án này được thực hiện bởi nhóm 12, lớp IE104.P11.CNVN dưới sự hướng dẫn của Th.S Võ Tấn Khoa.

## Thành Viên Nhóm

Các thành viên trong nhóm bao gồm:

| STT | Tên                | Mã Số Sinh Viên | Vai Trò    |
| --- | ------------------ | --------------- | ---------- |
| 1   | Phạm Võ Gia Huy    | 22520572       | Trưởng nhóm |
| 2   | Nguyễn Tấn Cao Hào | 22520402       | Thành Viên  |
| 3   | Nguyễn Văn Mạnh    | 22520850       | Thành Viên  |
| 4   | Đỗ Thành Danh      | 22520198       | Thành Viên  |
| 5   | Đinh Quốc Huy      | 22520535       | Thành Viên  |
| 6   | Phạm Hải Dương     | 22520309       | Thành Viên  |

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

**Bước 2:** Di chuyển vào thư mục frontend dự án.

```bash
cd restaurant-management/frontend
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


**Bước 5:** Di chuyển vào thư mục backend dự án.

```bash
cd restaurant-management/backend
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
