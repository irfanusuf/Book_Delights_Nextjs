import Book from "../../../models/bookModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";

const handler = async (req, res) => {
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
  }
};
export default handler;
