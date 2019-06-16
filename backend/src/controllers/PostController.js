const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { originalname: image, size, key, location: url = '' } = req.file;

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      size,
      key,
      url,
      image
    });

    req.io.emit('post', post);

    return res.json(post);
  }
};
