import mongoose from "mongoose";




const User =  mongoose.models.User ||

mongoose.model("User", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default User



