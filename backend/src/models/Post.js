const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    size: Number,
    key: String,
    url: String,
    likes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

PostSchema.pre('save', function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre('remove', function() {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: this.key })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'uploads', this.key)
    );
  }
});

module.exports = mongoose.model('Post', PostSchema);
