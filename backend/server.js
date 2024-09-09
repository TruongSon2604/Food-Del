import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRout from "./routes/orderRoute.js";

//app config
const app = express();
const port = 4000;

//middleware // Sử dụng middleware express.json() để parse dữ liệu JSON trong body
app.use(express.json());
app.use(cors());
//db connect
connectDB();
//Api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("upload"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRout);
// Định nghĩa route cho trang chủ
app.get("/", (req, res) => {
  res.send("Api is workingg");
});
// Khởi động server
app.listen(port, () => {
  console.log(`server: http://localhost:${port}`);
});

//mongodb+srv://truongngocson26042003:<password>@cluster0.mglhd.mongodb.net/?
