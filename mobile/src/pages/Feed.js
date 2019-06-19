import React, { Component } from 'react';
import io from 'socket.io-client';
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { ToastAndroid } from 'react-native';
import api from '../services/api';
import config from '../services/config';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => navigation.navigate('New')}
      >
        <Image source={camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerSocket();
    const response = await api.get('posts');

    this.setState({ feed: response.data });
  }

  registerSocket = () => {
    const socket = io(`http://${config.ipAddress}:3333`);

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

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  _emptyComponent = () => {
    return (
      <View style={styles.noPostContainer}>
        <Text style={styles.noPostText}>Não há post cadastrado!</Text>
      </View>
    );
  };

  deletePost = id => {
    api.delete(`/posts/${id}`);
    ToastAndroid.showWithGravity(
      'Post was successfully removed!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  render() {
    return (
      <MenuProvider>
        <View style={styles.container}>
          <FlatList
            data={this.state.feed}
            keyExtractor={post => post._id}
            ListEmptyComponent={this._emptyComponent}
            renderItem={({ item }) => (
              <View style={styles.feedItem}>
                <View style={styles.feedItemHeader}>
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{item.author}</Text>
                    <Text style={styles.place}>{item.place}</Text>
                  </View>
                  <Menu>
                    <MenuTrigger>
                      <Image source={more} />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption>
                        <Text>Editar</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => this.deletePost(item._id)}>
                        <Text>Excluir</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
                <Image
                  style={styles.feedImage}
                  source={{
                    uri: `http://${config.ipAddress}:3333/files/${item.key}`
                  }}
                />

                <View style={styles.feedItemFooter}>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.action}
                      onPress={() => this.handleLike(item._id)}
                    >
                      <Image source={like} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                      <Image source={comment} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                      <Image source={send} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.likes}>{item.likes} curtidas</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.hashtags}>{item.hashtags}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    color: '#000'
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: 'row'
  },
  action: {
    marginRight: 8
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  description: {
    lineHeight: 18,
    color: '#000'
  },
  hashtags: {
    color: '#7159c1'
  },
  noPostContainer: {
    lineHeight: 20,
    marginTop: Dimensions.get('window').height / 3,
    alignItems: 'center',
    alignSelf: 'center'
  },
  noPostText: {
    fontSize: 18,
    color: '#000'
  }
});
