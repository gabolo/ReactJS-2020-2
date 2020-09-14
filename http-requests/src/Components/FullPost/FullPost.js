import React from 'react';
import classes from './FullPost.css';
import { withRouter } from 'react-router-dom';

var FullPost = (props) => {
    var postIndex = props.match.params.postIndex;
    var openPost = props.openPost(postIndex);

    return openPost ? (
        <div className = {classes["full-post"]} onClick = {() => props.removePost(postIndex)} >
            <h2>{openPost.title}</h2>
            <p>{openPost.content}</p>
            <p className = {classes["author-text"]}>{openPost.author}</p>
        </div>
    ) : null;
}

export default withRouter(FullPost);