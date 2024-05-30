import Book from "../../../models/bookModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";

const handler = async () => {
  try {
    connectDb()
    const _id = req.params.id;

    const findBook = await Book.findByIdAndDelete(_id);

    if (!findBook) {
      messagehandler(res, 400, "Some Error");
    } else {
      messagehandler(res, 200, "Book deleted Successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;
