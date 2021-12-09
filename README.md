# E-COMMERCE APP

At DQEC, we know you have thousands of shopping apps to choose from, so we thank you for giving us a look, and we wanted to share our story with you.

Days ago, the founders of DQEC got together with one goal in mind: To help our sister-in-law create a shopping app. With her rock-solid lead for supplying quality goods from China and our can-do attitude, we set to work developing an intuitive, no-frills, shopping app just for you. With easy and secure sign-on, painless navigation, and our minimalistic aesthetic, you’ll find that the DQEC shopping experience is like no other. Browse our extensive collection of tens of items in categories everyone loves. Our new and old electronics, stylish Women’s Clothing, fashion forward Men’s Clothing, and jewelry so unique, you’ll be turning heads wherever you go! You’ll see that we provide the names, prices, and pictures of every item whenever you see them so there’s never any confusion about what you’re shopping for. Add items to your cart and shop until your total looks like a phone number. Then easily manage your cart so that it looks like a more reasonable shopping total. Everytime you checkout, you’ll receive a special surprise, something only found here at DQEC. You can also leave items in your cart if you’re not ready to purchase quite yet. Who knows, the next time you log in, there may be just the thing you’re looking for that was added by one of our vendors. Speaking of vendors - take your DQEC journey 1 step further by becoming an admin to sell your items. Adding, updating, and removing products from your shop is as easy as a few clicks, that way you can focus on what’s important to you - selling your goods.

So sign up today to start shopping or become an admin and start selling! Thank you for shopping by DQEC: quality goods, quality life.

## Table of Contents

- [Requirements](#Requirements)
- [Diagrams](#Diagrams)
- [Mock Ups](./public/assets/mockup)
- [Built With](#Built-With)
- [Installation](#Installation)
- [Available Scripts](#Available-Scripts)
- [Test Case Reports](./test)
- [Future Features](#Future-Features)

## Requirements

| [x]  | ID   | Priority | Description                                                  |
| ---- | ---- | -------- | ------------------------------------------------------------ |
| [x]  | F1   | MUST     | The application must support at least 4 categories; *electronics, jewelery, men's clothing, women's clothing* |
| [x]  | F2   | MUST     | The application must display as a minimum, an image, price and description of each item |
| [x]  | F3   | MUST     | The application must allow for items to be added to a shopping cart |
| [x]  | F4   | MUST     | The application must allow for items to be deleted from a shopping cart |
| [x]  | F5   | MUST     | The shopping cart must persist its state when the browser is closed |
| [x]  | F6   | MUST     | The application must work well on a mobile as well as a desktop device |
| [x]  | F6   | SHOULD   | (optional) The application should support an admin interface to allow for new items to be uploaded for sale |
| [x]  | F7   | SHOULD   | (optional) The application should support an admin interface to allow for item descriptions to be updated |
| [x]  | F8   | SHOULD   | (optional) The application should support an admin interface to allow for items to be removed from sale |
| [x]  | NF1  | MUST     | The application must have client & server-side validation in place |
| [x]  | NF2  | MUST     | The application must have evidence of automated unit testing |
| [x]  | NF3  | MUST     | The application code must be documented in a manner that it would be easy for a new developer to understand |
| [x]  | NF4  | MUST     | The application code must be stored in a GitHub repository   |

## Diagrams

![database diagram](./public/assets/readmeAssets/db.png)

![activity Diagram](./public/assets/readmeAssets/activityDiagram.png)

## Built With

- [VS Code](https://code.visualstudio.com/)
- [npm](https://www.npmjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Jest](https://jestjs.io/)
- [Nodemon](https://nodemon.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Sequelize](https://sequelize.org/master/manual/getting-started.html)

## Installation

1. Clone the repository

```bash
git clone https://github.com/Week-5/ecommerce.git
```

2. Change the working directory

```bash
cd ${PATH}/ecommerce
```

3. Install dependencies

```bash
npm install
```

## Available Scripts
In the project directory, you can run:

```bash
npm start
```
Runs the app in the development mode.<br />
Open [http://localhost:3000/homepage](http://localhost:3000/homepage) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

```bash
npm test
```
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://www.npmjs.com/package/jest) for more information.

## Future Features

- Create a global variable for user' session
  - this will eliminate multiple instances of user in each controller and routes all while persisting user activities and login status
- Create a designated db table for category
  - this will eliminate some DRY codes in the /controllers/category.js
- User receives an email confirmation after an account creation / update
- Log in page
  - 2FA functionality
    - Text? Call? Barcode? Authenticator?
  - OAuth
    - Log in using FB/GitHub/Google/etc
- Password is still hashed after user updates
  - password is only hashed upon account creation
- Switch to a serverless database for a seamless deployment
- While the pages are dynamic both on web and mobile, there are assets and forms that need refactoring, e.g. login/signup pages, item page, etc.
- Utilize NPM Multer to handle file uploads, e.g. profile photos, item photos
  - aon, users can only upload photos by providing a URL for items owned
  - profile photos are static.
- Display item stock quantity
  - display the quantity of the same item the user is purchasing on the cart page
- Error codes
  - user sees a status(404) when accessing a nonexisting page, and then gets redirected elsewhere, i.e. homepage
- Push live

