import mongoose from "mongoose";


const Book =  mongoose.models.Book ||

mongoose.model("Book", {

title : String,
author : String,
description : String,
price : Number,
imageUrl : String

});



export default Book