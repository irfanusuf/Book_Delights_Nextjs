import bcrypt from "bcrypt";
import User from "../../../models/userModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";
import  jwt  from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return messagehandler(res, 400, "Only POST Method is allowed");

  try {
    const { firstName, lastName, email, password } = req.body;

    if (firstName === "" && lastName === "" && email === "" && password === "") {
      return messagehandler(res, 400, "All Credentials Required!");
    }

    await connectDb();
    let user = await User.findOne({ email });

    if (user) {
      return messagehandler(res, 400, "User already Exists");
    }

    const passCrypt = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName,
      email,
      password: passCrypt,
    });
    if (user) {
      const token = await jwt.sign({_id : user._id} , "secretkeykuchbhi")
      res.status(201).json({ message: "User Created Succesfully", user , token});
    }
  } catch (error) {
    console.log(error);
    messagehandler(res, 500, "Server Error");
  }
};

export default handler;
