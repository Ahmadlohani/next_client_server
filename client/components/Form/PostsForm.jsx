import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import dynamic from "next/dynamic";
import {CameraOutlined} from "@ant-design/icons"
const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});
import 'react-quill/dist/quill.snow.css';
const PostsForm = ({content, setContent, postSubmit, handleImage}) => {
    return (
        <div>
            <Card>
            <Card.Body>
            <Form>
            <ReactQuill 
            theme="snow"
            value={content}
            onChange={e => setContent(e)}
            placeholder="Write Something here..."
            />
            </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between text-muted">
            <Button disabled={!content} variant="primary" className="sm" onClick={postSubmit}>
                Submit
            </Button>
            <label>
                <CameraOutlined className="mt-3 pointer" />
                <input onChange={handleImage} type="file" accept="images/*" hidden />
            </label>  
            </Card.Footer>
            </Card>
        </div>
    )
}

export default PostsForm
