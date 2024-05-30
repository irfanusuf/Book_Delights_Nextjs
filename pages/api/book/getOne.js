import Book from "../../../models/bookModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";

const handler = async (req, res) => {
  try {

    connectDb()

    const _id = req.params.id
    const book = await Book.findById(_id);

    if (book) {
      res.status(200).json({ message: "Book fetched Succesfully", book });
    } else {
      messagehandler(res, 400, "Some Error");
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
