import express from "express";
import {createPost, imageUpload} from "../controllers/post";
import { requireSignin } from "../middlewares";
import formidable from "express-formidable";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const router = express.Router();
router.post("/create-post", requireSignin ,createPost);
router.post("/image-upload", requireSignin, formidable({maxFileSize: 5*1024*1024}) ,imageUpload);

module.exports = router;