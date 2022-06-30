import { useContext, useState } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/UserRoute/UserRoute";
import PostsForm from "../../components/Form/PostsForm";
import axios from "axios";
import {toast} from "react-toastify";
const dashboard = () => {
    const [content, setContent] = useState("");
    const postSubmit = async (e) => {
        e.preventDefault();
        // console.log("data=>", content);
        try {
            const {data} = await axios.post("/create-post", {content});
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Post Created Successfully");
                setContent("");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        console.log([...formData]);
        try {
            const {data} = axios.post("/image-upload", formData);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <UserRoute>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4 className="text-center py-5">NewsFeed</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                <PostsForm content={content} setContent={setContent} postSubmit={postSubmit} handleImage={handleImage} />
                </div>
                <div className="col-md-4">
                    SideBar
                </div>
            </div>
        </div>
        </UserRoute>
    )
}

export default dashboard
