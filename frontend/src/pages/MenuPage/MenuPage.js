// frontend/src/pages/MenuPage/MenuPage.js
import React, { useState, useEffect } from 'react';
import MenuItem from '../../components/MenuItem/MenuItem';
import './MenuPage.css';
import RedButton from '../../components/RedButton/RedButton';
import axios from 'axios';

const MenuPage = () => {

    const [dishes, setDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('/v1/menu/getAllDishes');
                if (response.data.success) {
                    setDishes(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchDishes();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="menu-container">
            <header className="menu-header">
                <h1 className="menu-title">Thực đơn</h1>
            </header>

            <main className="menu-main">
                <h2 className="menu-subtitle">Tuyệt đỉnh hương vị Nhật</h2>
                <p className="menu-description">
                Ajimazing tự hào mang đến thực đơn phong phú với hơn 500 món ăn đặc trưng, hòa quyện tinh hoa ẩm thực Nhật Bản. Từ Sushi, Sashimi tươi ngon đến các món nướng Teppanyaki, lẩu Shabu-shabu và mì Ramen đậm đà. Thực đơn được thiết kế độc đáo theo từng mùa Xuân - Hạ - Thu - Đông, với nguyên liệu tươi mới từ các vùng nổi tiếng như Hokkaido, Kyoto, Osaka,...
                </p>
                <div className="menu-categories">
                    <span
                        className={`menu-category ${selectedCategory === null ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(null)}
                    >
                        Tất cả
                    </span>

                    <span
                        className={`menu-category ${selectedCategory === 'sushi' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('sushi')}
                        >
                        Sushi
                    </span>

                    <span
                        className={`menu-category ${selectedCategory === 'sashimi' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('sashimi')}
                        >
                        Sashimi
                    </span>

                    <span
                        className={`menu-category ${selectedCategory === 'grilled_dishes' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('grilled_dishes')}
                        >
                        Nướng
                    </span>

                    <span
                        className={`menu-category ${selectedCategory === 'hot_pots' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('hot_pots')}
                        >
                        Lẩu
                    </span>

                    <span
                        className={`menu-category ${selectedCategory === 'desserts' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('desserts')}
                        >
                        Tráng miệng
                    </span>

                    <span
                        className={`menu-category ${selectedCategory === 'beverages' ? 'active' : ''}`}
                        onClick={() => handleCategoryClick('beverages')}
                        >
                        Đồ uống
                    </span>
                    
                </div>
                <div className="menu-items">
                    {dishes
                        .filter((dish) => selectedCategory === null || dish.category === selectedCategory)
                        .map((dish) => (
                            <MenuItem
                                key={dish._id}
                                image={dish.image_link}
                                name={dish.dish_name}
                                price={dish.price}
                            />
                        ))}
                </div>
            </main>
        </div>
    );
};

export default MenuPage;
