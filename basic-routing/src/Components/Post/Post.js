import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

var Post = (props) => {
    return (
        <Link to={"/post/"+props.postIndex}>
            <div className = "post">
                <h2>{props.post.title}</h2>
                <p>{props.post.author}</p>
            </div>
        </Link>
    )
}

export default Post;