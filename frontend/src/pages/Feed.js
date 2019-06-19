import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';
import './Feed.css';
import Post from '../components/Post';

class Feed extends Component {
  state = {
    toggleMenu: {
      id: null,
      isMenuVisible: false
    },
    feed: []
  };

  handleToggleMenu = postId => {
    this.setState({
      toggleMenu: {
        id: postId,
        isMenuVisible: !this.state.toggleMenu.isMenuVisible
      }
    });
  };

  handleDeletePost = id => {
    api.delete(`/posts/${id}`);
  };

  async componentDidMount() {
    this.socketRegister();
    const response = await api.get('/posts');
    this.setState({ feed: response.data });
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  socketRegister = () => {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('delete', removedId => {
      this.setState({
        feed: this.state.feed.filter(post => removedId !== post._id)
      });
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });
  };

  render() {
    return (
      <section id="post-list">
        {this.state.feed.length === 0 ? (
          <div id="no-posts">
            <p>Não há posts cadastrados!</p>
          </div>
        ) : (
          this.state.feed.map(post => (
            <Post
              key={post._id}
              toggleMenu={this.state.toggleMenu}
              post={post}
              handleToggleMenu={this.handleToggleMenu}
              handleLike={this.handleLike}
              handleDeletePost={this.handleDeletePost}
            />
          ))
        )}
      </section>
    );
  }
}

export default Feed;
