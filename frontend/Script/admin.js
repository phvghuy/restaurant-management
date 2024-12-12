// JavaScript: dashboard.js

// Hàm hiển thị các phần khác nhau khi click vào các menu
function showSection(sectionId) {
    // Ẩn tất cả các section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Hiển thị section được chọn
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

