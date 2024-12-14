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
    getMenu: async (req, res) => {
        try {
            // Các tham số phân trang, mặc định trang 1, mỗi trang 10 phần tử
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            // Các tham số lọc (ví dụ: lọc theo category)
            const category = req.query.category;
            let filter = {};
            if (category) {
                filter.category = category; 
            }

            // Các tham số sắp xếp (ví dụ: sắp xếp theo giá tăng dần)
            const sort = req.query.sort;
            let sortOptions = {};
            if (sort) {
                if(sort === 'price_asc'){
                    sortOptions = { price: 1 }; // Tăng dần
                } else if(sort === 'price_desc'){
                    sortOptions = { price: -1 }; // Giảm dần
                } else if(sort === 'name_asc'){
                    sortOptions = { dish_name: 1 };
                } else if(sort === 'name_desc'){
                    sortOptions = { dish_name: -1 }
                }
            }

            // Lấy danh sách món ăn
            const dishes = await Dish.find(filter)
                .skip(skip)
                .limit(limit)
                .sort(sortOptions); 

            // Lấy tổng số món ăn (để tính tổng số trang)
            const totalDishes = await Dish.countDocuments(filter);

            res.status(200).json({
                success: true,
                data: dishes,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalDishes / limit),
                    totalItems: totalDishes,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    getCategories: async (req, res) => {
        try {
            // Lấy danh sách các danh mục duy nhất, দোকুপদম,
            const categories = await Dish.distinct("category");

            res.status(200).json({ success: true, data: categories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },
};

module.exports = menuControllers;
