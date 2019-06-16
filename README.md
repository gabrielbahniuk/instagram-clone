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

### Frontend

- Under `~/frontend` run `yarn && yarn start`. Now you can access it directly in your browser under `http://localhost:3000`.

### Mobile

- Open the file `~/mobile/src/services/config.js` and configure your IP Address accordingly.
- Go back to `~/mobile` and run `yarn && react-native run-android` for android environment, or `yarn && react-native run-ios` for iOS environment.