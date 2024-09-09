import mongoose from "mongoose";
const orderSchelma= new mongoose.Schema({
    userId:{type:String,required:true},
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    cartData:{type:Object,default:{}}
})

const orderModel=   mongoose.models.order || mongoose.model('order',orderSchelma);
export default orderModel;