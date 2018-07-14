# Shippit

Shippit is a React app to help people keep track of their items when moving. For every box you use, create a box by naming it, entering in the dimensions, and saving a picture of it. You can then add items to a box with a name, description, and image. There's a search function you can use to find which box contains a specific item. The app will also keep track of the number boxes and items in your move as well as the total cubic feet of all your boxes.

## Setup

This app makes use of Firebase and FontAwesome 5 Pro. Since these need credentials, you'll need to create a `.env` file like so:

```bash
# Firebase credentials
REACT_APP_API_KEY=xxxxxxxxx
REACT_APP_AUTH_DOMAIN=sample.firebaseapp.com
REACT_APP_DATABASE_URL=https://sample.firebaseio.com
REACT_APP_PROJECT_ID=sample
REACT_APP_STORAGE_BUCKET=sample.appspot.com
REACT_APP_MESSAGING_SENDER_ID=yyyyyyyyyy
# FontAwesome 5 Pro credentials
NPM_TOKEN=this-is-your-FA5-Pro-auth-token
```

You'll then need to create a `.npmrc` file in order to download FA5 Pro

```bash
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${NPM_TOKEN}
```

I replaced `${NPM_TOKEN}` with the actual token string in development, but you must leave like it this to deploy on Netlify.

After that, `yarn install` and you're good to go.
