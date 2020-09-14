import React from 'react';
import './FullPost.css';
import { withRouter } from 'react-router-dom';

var FullPost = (props) => {
    var openPost = props.openPost(props.match.params.postIndex);

    return openPost ? (
        <div className = "full-post">
            <h2>{openPost.title}</h2>
            <p>{openPost.content}</p>
            <p className = "author-text">{openPost.author}</p>
        </div>
    ) : null;
}

export default withRouter(FullPost);