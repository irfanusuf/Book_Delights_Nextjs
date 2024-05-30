import Book from "../../../models/bookModel";
import cloudinary from "../../../utils/cloudinary";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";
import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

const handler = async () => {
  connectDb()
  const { title, author, description, price } = req.body;

  if (title || author || description || price === "") {
    return messagehandler(res, 400, "All details of Book Required");
  }
  await upload.single("image");

  const image = req.file.path;

  const uploadImg = await cloudinary.uploader.upload(image, {
    folder: "Book__Delights",
  });

  if (!uploadImg) {
    return messagehandler(res, 400, "Cloudinary Error");
  }

  const imageUrl = uploadImg.secure_url;

  const book = await Book.create({
    title,
    author,
    description,
    price,
    imageUrl,
  });

  if (book) {
    return messagehandler(res, 201, "Book saved Succesfully");
  } else {
    return messagehandler(res, 200, "Some Error!");
  }
};

export default handler;
