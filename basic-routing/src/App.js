import React, { Component } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Posts from './Components/Posts/Posts';
import FullPost from './Components/FullPost/FullPost';
import NewPost from './Components/NewPost/NewPost';
import './App.css';

class App extends Component {
  state = {
    posts: [
      {
        title: "First Title",
        author: "Cristian",
        content: "Lorem ipsum dolor sit amet, consectetur "+
          "adipiscing elit, sed do eiusmod tempor incididunt "+
          "ut labore et dolore magna aliqua. Ut enim ad minim "+
          "veniam, quis nostrud exercitation ullamco laboris "+
          "nisi ut aliquip ex ea commodo consequat."
      },
      {
        title: "Second Title",
        author: "Mike",
        content: "Duis aute irure dolor in reprehenderit in "+
        "voluptate velit esse cillum dolore eu fugiat nulla "+
        "pariatur. Excepteur sint occaecat cupidatat non proident, "+
        "sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        title: "Third Title",
        author: "Juan",
        content: "Sed ut perspiciatis unde omnis iste natus error "+
        "sit voluptatem accusantium doloremque laudantium, totam rem "+
        "aperiam, eaque ipsa quae ab illo inventore veritatis et quasi "+
        "architecto beatae vitae dicta sunt explicabo."
      },
      {
        title: "Forth Title",
        author: "Ana",
        content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur "+
        "aut odit aut fugit, sed quia consequuntur magni dolores eos qui "+
        "ratione voluptatem sequi nesciunt."
      }
    ],
    newPostInfo: {
      title: "",
      author: "",
      content: ""
    }
  }

  render () {
    return(
      <BrowserRouter>
          <header>
            <nav className = "nav-bar">
              <ul>
                {/* <li><a href = "/">Home</a></li> */}
                <li><Link to="/">Home</Link></li>
                {/* <li><a href = "/new-post">New Post</a></li> */}
                <li><Link to="/new-post">New Post</Link></li>
              </ul>
            </nav>
          </header>
          <h1 className = "main-header">My posts</h1>

          <Route path = "/new-post" render = {() => (
              <NewPost
                  newPostInfo = {this.state.newPostInfo}
                  updateNewPostData = {this.updateNewPostData}
                  submitNewPost = {this.submitNewPost}
              />
          )} />
          <Route path ="/" exact render = {() => <Posts posts = {this.state.posts} />} />
          <Route path ="/post/:postIndex" exact render = {() => (
              <FullPost openPost = {(postIndex) => this.openPost(postIndex)} />
          )} />
      </BrowserRouter>
    )
  }

  openPost = (postIndex) => {
    return this.state.posts[postIndex];
  }

  updateNewPostData = (event, type) => {
    var updatedNewPostInfo = {
      ...this.state.newPostInfo
    }

    updatedNewPostInfo[type] = event.target.value;

    this.setState({
      newPostInfo: updatedNewPostInfo
    });
  }

  submitNewPost = () => {
    var updatedPosts = [...this.state.posts];
    var newPostInfo = {...this.state.newPostInfo}

    updatedPosts.push(newPostInfo);

    this.setState({
      posts: updatedPosts,
      newPostInfo: {
        title: "",
        author: "",
        content: ""
      }
    })
  }
}

export default App;
