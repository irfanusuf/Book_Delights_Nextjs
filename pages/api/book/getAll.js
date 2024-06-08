import Book from "../../../models/bookModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";
import { createRouter } from "next-connect";
const apiRoute = createRouter()



apiRoute.get(async (req, res) => {
  try {
    connectDb()
    const books = await Book.find();

    if (books) {
      res.status(200).json({ message: "Books fetched Succesfully", books });
     
    } else {
      messagehandler(res, 400, "Some Error");
    }
  } catch (error) {
    console.log(error);
    messagehandler(res, 400, "Server  Error");
  }
})


export default apiRoute.handler()

