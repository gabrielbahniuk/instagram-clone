# Instagram clone

### Backend

- Set up a MongoDB instance e.g. in MongoAtlas or localhost.
- Create a file `.env` under `~/backend`.
- Configure the environment variable `MONGO_URL` within `.env` file. 
- Under `~/backend` run `yarn && yarn dev` and it's done!
- Now you can access it in your browser `http://localhost:3333/posts`

#### Choosing between Local repository or Amazon S3.
- You can choose where your images will be saved: localhost or s3.
To do so, first create a bucket on Amazon S3. After, update in the file `~/backend/.env` accordingly:
- `STORAGE_TYPE`: accepts the values `s3` or `local`.
- `AWS_BUCKET_NAME`: the bucket name you've just created on Amazon S3.
- Also update the variables below according to your personal information on S3:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
```

### Frontend

- Under `~/frontend` run `yarn && yarn start`. Now you can access it directly in your browser under `http://localhost:3000`.

### Mobile

- Open the file `~/mobile/src/services/config.js` and configure your IP Address accordingly.
- Go back to `~/mobile` and
- for Android device/emulator: `yarn && react-native link react-native-image-picker && react-native link react-native-gesture-handler && react-native run-android`
- for iOS device/emualtor: run `yarn && react-native link react-native-image-picker && react-native link react-native-gesture-handler && react-native run-ios`