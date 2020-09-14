import React, { Component } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Posts from './Components/Posts/Posts';
import FullPost from './Components/FullPost/FullPost';
import NewPost from './Components/NewPost/NewPost';
import classes from './App.css';
import axios from './instances/axiosInstance';

class App extends Component {
  state = {
    posts: [],
    newPostInfo: {
      title: "",
      author: "",
      content: ""
    }
  }

  componentDidMount () {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0,4);

        const updatedPosts = posts.map(post => {
          return {
            title: post.title.slice(0,10),
            author: "Cristian",
            content: post.body
          }
        });

        this.setState({posts: updatedPosts})
      })
  }

  componentShouldUpdate(nextProps, nextState) {
    return nextState.openPostIndex !== this.state.openPostIndex;
  }

  render () {
    return(
      <BrowserRouter>
        <div>
          <header>
            <nav className = {classes["nav-bar"]}>
              <ul>
                {/* <li><a href = "/">Home</a></li> */}
                <li><Link to="/">Home</Link></li>
                {/* <li><a href = "/new-post">New Post</a></li> */}
                <li><Link to="/new-post">New Post</Link></li>
              </ul>
            </nav>
          </header>
          <h1 className = {classes["main-header"]}>My posts</h1>

          <Route path = "/new-post" render = {() => (
              <NewPost
                  newPostInfo = {this.state.newPostInfo}
                  updateNewPostData = {this.updateNewPostData}
                  submitNewPost = {this.submitNewPost}
              />
          )} />
          <Route path ="/" exact render = {() => <Posts posts = {this.state.posts} />} />
          <Route path ="/post/:postIndex" exact render = {() => (
              <FullPost openPost = {(postIndex) => this.openPost(postIndex)} removePost = {this.removePost}/>
          )} />
        </div>
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

  removePost = (postIndex) => {
    axios.delete('/posts/' + postIndex)
    .then(response => {
      console.log('response:', response);
    })
    .catch(error => {
      console.log('error:', error);
    });
  }

  submitNewPost = () => {
    var updatedPosts = [...this.state.posts];
    var newPostInfo = {...this.state.newPostInfo}

    updatedPosts.push(newPostInfo);

    axios.post('/posts', newPostInfo)
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error)
      })

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
