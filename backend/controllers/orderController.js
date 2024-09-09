// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// const placeOrder = async (req, res) => {
//   try {
//     // Lấy thông tin người dùng từ userId trong request
//     const user = await userModel.findById(req.body.userId);

//     // Kiểm tra xem người dùng có tồn tại không
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Lấy dữ liệu giỏ hàng từ user
//     const cartData = user.cartData;

//     // Kiểm tra nếu giỏ hàng rỗng
//     if (!cartData || Object.keys(cartData).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is empty",
//       });
//     }

//     // Tạo đơn hàng mới với thông tin từ request và giỏ hàng
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       amount: req.body.amount,
//       address: req.body.address,
//       cartData: cartData,
//     });

//     // Lưu đơn hàng vào cơ sở dữ liệu
//     await newOrder.save();

//     // Xóa giỏ hàng của người dùng sau khi đặt hàng
//     user.cartData = {};
//     await user.save();

//     // Gửi phản hồi thành công
//     res.status(200).json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     // Xử lý lỗi
//     res.status(500).json({
//       success: false,
//       message: "Error placing order",
//       error: error.message,
//     });
//   }
// };

// export { placeOrder };
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeList = async (req, res) => {
  try {
    // Truy vấn tất cả đơn hàng từ cơ sở dữ liệu
    const orders = await orderModel.find();

    // Nếu không có đơn hàng nào
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    // Xử lý lỗi
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};


const placeOrder = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = user.cartData;

    // Lấy danh sách các ID sản phẩm từ cartData
    const foodIds = Object.keys(cartData);

    // Truy vấn thông tin các món ăn tương ứng với các ID này
    const foods = await foodModel.find({ _id: { $in: foodIds } });

    // Tạo object để map ID món ăn với tên món ăn
    const foodNames = foods.reduce((acc, food) => {
      acc[food._id] = food.name;
      return acc;
    }, {});

    // Tạo đơn hàng mới với thông tin từ request và giỏ hàng
    const newOrder = new orderModel({
      userId: req.body.userId,
      amount: req.body.amount,
      address: req.body.address,
      cartData: cartData,
    });

    await newOrder.save();

    // Xóa giỏ hàng của người dùng sau khi đặt hàng
    user.cartData = {};
    await user.save();

    // Gửi phản hồi thành công với thông tin đơn hàng và tên món ăn
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
      foodNames: foodNames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

export { placeOrder, placeList };
