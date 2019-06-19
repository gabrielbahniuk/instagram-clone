import React, { Component } from 'react';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import likeActive from '../../assets/like-active.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

export default class Post extends Component {
  render() {
    const {
      post,
      handleDeletePost,
      handleToggleMenu,
      handleLike,
      toggleMenu
    } = this.props;
    return (
      <article>
        <header>
          <div className="user-info">
            <span>{post.author}</span>
            <span className="place">{post.place}</span>
          </div>
          <section>
            <button
              className="btn-more"
              type="button"
              onClick={() => handleToggleMenu(post._id)}
            >
              <img src={more} alt="Mais" />
            </button>
            {post._id === toggleMenu.id && (
              <div
                className="toggle-menu"
                style={{
                  visibility: toggleMenu.isMenuVisible ? 'visible' : 'hidden'
                }}
              >
                <button>
                  <p>Editar</p>
                </button>
                <hr id="menu-separator" />
                <button onClick={() => handleDeletePost(post._id)}>
                  <p>Excluir</p>
                </button>
              </div>
            )}
          </section>
        </header>
        <img src={`http://localhost:3333/files/${post.key}`} alt="" />

        <footer>
          <div className="actions">
            <button type="button" onClick={() => handleLike(post._id)}>
              <img src={post.likes ? likeActive : like} alt="" />
            </button>
            <img src={comment} alt="" />
            <img src={send} alt="" />
          </div>

          <strong>{post.likes} curtidas</strong>

          <p>
            {post.description}
            <span>{post.hashtags}</span>
          </p>
        </footer>
      </article>
    );
  }
}
