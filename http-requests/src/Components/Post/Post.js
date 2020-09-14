import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Post.css';

var Post = (props) => {
    return (
        <Link to={"/post/"+props.postIndex}>
            <div className = {classes["post"]}>
                <h2>{props.post.title}</h2>
                <p>{props.post.author}</p>
            </div>
        </Link>
    )
}

export default Post;