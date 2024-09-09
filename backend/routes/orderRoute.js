import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { placeOrder,placeList } from "../controllers/orderController.js"
const orderRout= express.Router();

orderRout.post("/place",authMiddleware,placeOrder);
orderRout.get("/place/list",placeList);
export default orderRout;