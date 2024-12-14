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
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ success: false, message: "Query parameter is required" });
        }

        try {
            // Tìm kiếm món ăn dựa trên tên món ăn (dish_name) hoặc loại món ăn (category)
            // Sử dụng $or để tìm kiếm theo một trong hai trường
            // Sử dụng .trim() để loại bỏ khoảng trắng thừa từ query;  Regex không phân biệt hoa thường (i flag)
            const dishes = await Dish.find({
                $or: [
                    { dish_name: { $regex: new RegExp(query.trim(), "i") } },
                    { category: { $regex: new RegExp(query.trim(), "i") } }
                ]
            });

            if (dishes.length === 0) {
                return res.status(404).json({ success: false, message: "No dishes found matching the query" });
            }

            return res.status(200).json({ success: true, data: dishes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    },
};

module.exports = menuControllers;
