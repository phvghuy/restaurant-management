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
            // Lấy tất cả món ăn
            const dishes = await Dish.find();

            res.status(200).json({
                success: true,
                data: dishes
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    getDishesByCategory: async (req, res) => {
        try {
            const { category } = req.query;

            // Validate category
            const validCategories = ["sushi", "sashimi", "grilled_dishes", "hot_pots", "desserts", "beverages"];
            if (!category || !validCategories.includes(category)) {
                return res.status(400).json({ success: false, message: "Invalid category" });
            }

            // Filter by category
            let filter = { category };

            const dishes = await Dish.find(filter);

            res.status(200).json({
                success: true,
                data: dishes,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    getCategories: async (req, res) => {
        try {
            // Lấy danh sách các danh mục cứng
            const categories = ["sushi", "sashimi", "grilled_dishes", "hot_pots", "desserts", "beverages"];
            res.status(200).json({ success: true, data: categories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },
};

module.exports = menuControllers;
