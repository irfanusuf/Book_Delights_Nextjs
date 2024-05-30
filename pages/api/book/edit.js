import Book from "../../../models/bookModel";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";

const handler = async (req, res) => {
  try {
    connectDb()
    const _id = req.params.id;
    const book = await Book.findById(_id);

    if (!book) {
      return messagehandler(res, 404, "Book Not Found");
    }

    const { title, author, description, price } = req.body;

    await upload.single("image");

    const image = req.file.path;

    const uploadImg = await cloudinary.uploader.upload(image, {
      folder: "Book__Delights",
    });

    if (!uploadImg) {
      return messagehandler(res, 400, "Cloudinary Error");
    }

    const imageUrl = uploadImg.secure_url;

    const updateBook = await Book.findByIdAndUpdate({
      title,
      author,
      description,
      price,
      imageUrl,
    });

    if (updateBook) {
      messagehandler(res, 200, "Book Updated Succesfully!");
    } else {
      messagehandler(res, 400, "Some Error");
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
