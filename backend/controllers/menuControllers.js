const Dish = require("../models/Dish");

const menuControllers = {
    getDishDetail: async (req, res) => {
        //Theo tiêu chuẩn HTTP, các yêu cầu GET không gửi dữ liệu qua body. Thay vào đó, 
        //dữ liệu được truyền qua: req.query hoặc req.params
        const { dishName } = req.params; // Lấy từ req.params
        console.log("Dish name received:", dishName);

        if (!dishName) {
            return res.status(400).json({ success: false, message: "Dish name is required" });
        }
    
        try {
            // Tìm món ăn trực tiếp qua `dish_name` (case-insensitive)
            // Sử dụng .trim() để loại bỏ khoảng trắng thừa từ dishName;  Regex không phân biệt hoa thường (i flag)
            const dish = await Dish.findOne({ dish_name: { $regex: new RegExp(dishName.trim(), "i") } });
            console.log("Query result:", dish);
            
            if (!dish) {
                return res.status(404).json({ success: false, message: "Dish not found" });
            }
    
            return res.status(200).json({ success: true, data: dish });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    },

    searchDish: async (req, res) => {
        const { dish_name, category, page, limit, sort } = req.query; // Lấy thêm category
        const filter = {};

        // Tìm kiếm theo dish_name (nếu có)
        if (dish_name) {
            filter.dish_name = { $regex: new RegExp(dish_name.trim(), "i") };
        }

        // Lọc theo category (nếu có)
        const validCategories = ["sushi", "sashimi", "grilled_dishes", "hot_pots", "desserts", "beverages"];
        if (category && validCategories.includes(category)) {
            filter.category = category;
        }

        // Các tham số phân trang, mặc định trang 1, mỗi trang 10 phần tử
        const pageQuery = parseInt(page) || 1;
        const limitQuery = parseInt(limit) || 10;
        const skip = (pageQuery - 1) * limitQuery;

        // Các tham số sắp xếp (ví dụ: sắp xếp theo giá tăng dần)
        // const sort = req.query.sort;
        let sortOptions = {};
        if (sort) {
            if (sort === 'price_asc') {
                sortOptions = { price: 1 }; // Tăng dần
            } else if (sort === 'price_desc') {
                sortOptions = { price: -1 }; // Giảm dần
            } else if (sort === 'name_asc') {
                sortOptions = { dish_name: 1 };
            } else if (sort === 'name_desc') {
                sortOptions = { dish_name: -1 }
            }
        }
        try {
            const dishes = await Dish.find(filter)
                .skip(skip)
                .limit(limitQuery)
                .sort(sortOptions);

            // Lấy tổng số món ăn (để tính tổng số trang)
            const totalDishes = await Dish.countDocuments(filter);
            const response = {
                success: true,
                data: dishes,
                pagination: {
                    currentPage: pageQuery,
                    totalPages: Math.ceil(totalDishes / limitQuery),
                    totalItems: totalDishes,
                },
            }

            if (dishes.length === 0) {
                response.message = "No dishes found matching the criteria";
            }
            
            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    },
};

module.exports = menuControllers;
