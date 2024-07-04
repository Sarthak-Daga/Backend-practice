import mongoose from "mongoose";

export async function Connections() {
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection

    connection.on('connected' , ()=>{
      console.log("Connection to MogoDB established");
    })

    connection.on('error' , (err)=>{
      console.log("Please check if database is UP"  + err);
      process.exit
    })

  } catch (error) {
    console.log("Something went Wrong while connecting to DB")
    console.log(error);
    
  }
}