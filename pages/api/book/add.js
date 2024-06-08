import bodyParser from "body-parser";
import Book from "../../../models/bookModel";
import cloudinary from "../../../utils/cloudinary";
import connectDb from "../../../utils/connDb";
import messagehandler from "../../../utils/features";
import multer from "multer";
import { createRouter } from "next-connect";

const upload = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = createRouter({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: "Not Found" }); 
  },
});

apiRoute.use(upload.single("image"));
apiRoute.post(async (req, res) => {
  try {
    connectDb();

    const { title, author, description, price, image } = req.body;

    if (title === "" || author === "" || description === "" || price === "") {
      return messagehandler(res, 400, "All details of Book Required");
    }

    if (!image) {
      return messagehandler(res, 400, "select image");
    }

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
  } catch (error) {
    console.log(error);
    return messagehandler(res, 500, "server Error");
  }
});

export default apiRoute.handler();
