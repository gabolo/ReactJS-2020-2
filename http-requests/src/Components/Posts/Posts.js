import React from 'react';
import Post from '../Post/Post';

var Posts = (props) => {
    return(
        <section className = "posts">
            {props.posts.map((post, postIndex) => {
                return (
                    <Post
                        post = {post}
                        postIndex = {postIndex}
                        key = {postIndex}
                    />
                )
            })}
        </section>
    );
}

export default Posts;