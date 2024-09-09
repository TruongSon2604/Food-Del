import userModel from "../models/userModel.js";
import authMiddleware from "../middlewares/auth.js";
//add item from user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    console.log("id", req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error1" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData =await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0)
    {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error2" });
  }
};

const getCart = async (req, res) => {

  try {
    let userData =await userModel.findById(req.body.userId);
    let cartData =await userData.cartData;
    res.json({success:true,cartData});

  } catch (error) {
    console.log("getcart3",error);
    res.json({success:false,message:"error3"})
  }
};
export { addToCart, removeFromCart, getCart };
