import Post from "../models/post";
import cloudinary from "cloudinary";
export const createPost = (req, res) => {
    // console.log(req.body);
    const {content} = req.body;
    if (!content.length) {
        return res.json({
            error: "Content is required"
        })
    }
    const post = new Post({content, postedBy: req.user._id});
    try {

        post.save();
        return res.json(post);
        
    } catch (error) {
        return res.sendStatus(400);
    }

}

export const imageUpload = async (req, res) => {
    // console.log("image file", req.files);
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        // console.log("image uploaded result", result);
        return res.json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.log(error);
    }
}