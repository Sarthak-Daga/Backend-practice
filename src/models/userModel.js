import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Username:{
    type:String,
    required:[true , "Please Provide a Username"],
    unique:true
  },
  Email:{
    type:String,
    required:[true , "Please Provide a Email"],
    unique:true
  },
  Password:{
    type:String,
    required:[true , "Please Provide a Password"],
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  },

  forgotPasswordToken : String,
  forgotPasswordTokenExpiry : Date,
  verifyToken : String,
  verifyTokenExpiry : Date
  
})


const User = mongoose.model.users || mongoose.model("users" , userSchema)

export default User