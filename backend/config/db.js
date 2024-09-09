import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
      "mongodb+srv://truongngocson26042003:123@cluster0.mglhd.mongodb.net/food_del"
    )
    .then(() => {
      console.log("DB connected");
    });
};


