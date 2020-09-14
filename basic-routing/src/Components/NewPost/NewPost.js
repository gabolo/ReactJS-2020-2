import React from 'react';
import './NewPost.css';

var NewPost = (props) => {
    return (
        <table className = "new-post-form">
            <tbody>
                <tr>
                    <td>
                        <label>Post title</label>
                    </td>
                    <td>
                        <input type="text" value={props.newPostInfo["title"]}
                            onChange={(event) => props.updateNewPostData(event, "title")}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Post Author</label>
                    </td>
                    <td>
                        <input type="text" value={props.newPostInfo["author"]}
                            onChange = {(event) => props.updateNewPostData(event, 'author')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Content</label>
                    </td>
                    <td>
                        <textarea type="text" value={props.newPostInfo["content"]}
                            onChange = {(event) => props.updateNewPostData(event, 'content')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick = {props.submitNewPost}>Add new Post</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default NewPost;