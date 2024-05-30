import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/userModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return messagehandler(res, 400, "Only POST Method is allowed");

  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return messagehandler(res, 400, "All Credentials Required!");
    }

    await connectDb();

    const user = await User.findOne({ email });

    if (!user) {
      return messagehandler(res, 400, "No user Found");
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return messagehandler(res, 401, "Incorrect password");
    }

    const token = await jwt.sign({ _id: user._id }, "secretkeykuchbhi");

    if (token) {
      res.status(200).json({ message: "Logged in succesfully", user , token });
    }
  } catch (error) {
    console.log(error);
    messagehandler(res, 500, "Server Error");
  }
};

export default handler;
