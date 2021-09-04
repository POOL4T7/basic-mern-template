# basic-mern-template

> Fully authenticated with JWT-token,Google login, Google reCaptcha for distinguish between human and bot.
> Basic MERN Stack Template.

<br>

<img src="https://i.imgur.com/SR6Bfvg.png" >

<br >
<br >

## Clone the project

```bash
git clone https://github.com/POOL4T7/shop.git
cd shop
```

<br>

## Install dependencies for server/client

```bash
# Install dependencies
npm run install-packages

# for more info look at package.json on root folder
```

<br>

> Before starting the server make a .env file on root folder and add your constant value

- NODE_ENV
- MONGO_URL
- JWT_SECRET
- RECAPTCHA_SECRET_KEY (if you want to add google reCaptcha)

<br>

> if you want to add google reCaptcha then make a another .env file in frontend folder and add your constant value

- REACT_APP_RECAPTCHA_KEY

<br>

## Run the server && client simultaneously

```bash
# make sure you are on root directory of project
npm start
# Server runs on http://localhost:5000 and client on http://localhost:3000

```

## Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page
