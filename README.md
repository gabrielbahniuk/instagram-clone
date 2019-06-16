# Instagram clone

### Backend

- Create a free MongoDB instance to test e.g. in MongoAtlas.
- Create a `database.js` file under `~/backend/src/config` and put the content below within the file, changing your connection data from the instance you've just created:
```
module.exports = {
  dbUsername: '<YOUR_USERNAME>',
  dbPassword: '<YOUR_PASSWORD>',
  dbServer: '<YOUR_SERVER>',
  dbInstance: '<YOUR_INSTANCE>',
}
```
- Under `~/backend` run `yarn && yarn dev` and it's done!
- Now you can access it in your browser `http://localhost:3333/posts`

#### Choosing between Local repository or Amazon S3.
- You can choose where your images will be saved.
To do so, first create a bucket on Amazon S3, and update the file `~/backend/config/uploads.js` in the following line with the bucket name:

`bucket: 'uploadexample2332',`

and in the same file, be sure the module exports `s3` is set, as follows:
`storage: storageTypes['s3'],`

- Create a file called `.env` under `~/backend` with the following lines:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
```

- Fill the gaps with your personal information from your Amazon S3 bucket.

- After that you should be able to upload to your S3 Bucket instead of local folder.


### Frontend

- Under `~/frontend` run `yarn && yarn start`. Now you can access it directly in your browser under `http://localhost:3000`.

### Mobile

- Open the file `~/mobile/src/services/config.js` and configure your IP Address accordingly.
- Go back to `~/mobile` and
- for Android device/emulator: `yarn && react-native link react-native-image-picker && react-native link react-native-gesture-handler && react-native run-android`
- for iOS device/emualtor: run `yarn && react-native link react-native-image-picker && react-native link react-native-gesture-handler && react-native run-ios`