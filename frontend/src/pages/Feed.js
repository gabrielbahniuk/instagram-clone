import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';
import Loader from 'react-loader-spinner';
import Post from '../components/Post';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import './Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
  }

  state = {
    toggleMenu: {
      id: null,
      isMenuVisible: false
    },
    feed: [],
    loading: false
  };

  addNotification = (title, message, type) => {
    this.notificationDOMRef.current.addNotification({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
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
    api
      .delete(`/posts/${id}`)
      .then(response => {
        const { message } = response.data;
        this.addNotification('Delete post', message, 'success');
      })
      .catch(error => {
        this.addNotification('Error', 'Please try again later.', 'danger');
      });
  };

  async componentDidMount() {
    this.socketRegister();
    this.setState({ loading: true });
    await api
      .get('/posts')
      .then(response => {
        this.setState({ feed: response.data, loading: false });
      })
      .catch(error => {
        this.addNotification(
          'Error',
          'Could not load posts. Please try again later.',
          'danger'
        );
        this.setState({ loading: false });
      });
  }

  handleLike = id => {
    api
      .post(`/posts/${id}/like`)
      .then(response => {
        const { message } = response.data;
        this.addNotification('Like', message, 'success');
      })
      .catch(error => {
        this.addNotification('Error', 'Please try again later.', 'danger');
      });
  };

  socketRegister = () => {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
      console.log(newPost);
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
        {this.state.loading ? (
          <div className="loader">
            <Loader type="Oval" color="#000" height="80" width="80" />
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
        <ReactNotification ref={this.notificationDOMRef} />
      </section>
    );
  }
}
export default Feed;
