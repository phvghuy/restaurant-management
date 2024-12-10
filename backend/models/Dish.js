const mongoose = require("mongoose")

const dishSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true, // Tên danh mục (e.g., sushi, sashimi, grilled_dishes)
  },
  dish_name: {
    type: String,
    required: true, 
  },
  image_link: {
      type: String,
      required: true, 
  },
  description: {
    type: String,
    required: true, // Mô tả món ăn
  },
  price: {
    type: Number,
    required: true, // Giá món ăn
  }
})

module.exports = mongoose.model("Dish", dishSchema, "menu"); // Trỏ đến collection 'menu'
