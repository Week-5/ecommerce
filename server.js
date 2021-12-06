/* eslint-disable max-len */
const express = require("express");
const port = 3000;
const { User, Item, Cart } = require("./index");
const { db } = require("./db");

const { engine } = require("express-handlebars");

const app = express();

// send data as json object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable handlebars frontend
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");

app.use(express.static("public"));

const seed = require("./seed");

// app.use(express.json());

// seed database
seed();

// get all items
app.get("/items", async (req, res) => {
  const items = await Item.findAll();
  const data = {
    items: items,
  };
  res.render("allItems", { data });
});

// homepage without user logged in
app.get("/homepage", async (req, res) => {
  res.status(200).render("homepage");
});

// homepage with user loggined in
app.get("/homepage/:username", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const cart = await Cart.findOne({
    where: { UserUsername: user.username },
  });
  const items = await user.getItems();
  const allItems = await Item.findAll();
  // allItems.sort(function(a, b) {
  //   return a-b;
  // });
  const data = {
    user: user,
    userItems: items,
    userCart: cart,
    allItems: allItems,
  };

  res.status(200).render("homepage", { data });
});

// create account path
app.get("/create-account", async (req, res) => {
  res.status(200).render("createUser");
});

app.get("/users/:username", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const data = {
    user: user,
  };
  res.render("user", { data });
});

// post account path
app.post("/create-account", async (req, res) => {
  const newUsername = req.body.username;
  const newFullName = req.body.newFullName;
  const newEmail = req.body.newEmail;
  const newPassword = req.body.password;

  // create new user
  const newUser = await User.create({
    username: newUsername,
    fullName: newFullName,
    email: newEmail,
    password: newPassword,
  });

  // create new cart and assign it to new user
  const newUserCart = await Cart.create({
    totalPrice: 0,
    UserUsername: newUser.username,
  });

  res.status(200).redirect(`/homepage/${newUser.username}`);
});

// user can view their account page
// if admin send admin items to frontend
app.get("/users/:username/", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const data = {};

  if (user.isAdmin === true) {
    const items = await user.getItems();
    data = {
      user: user,
      userItems: items,
    };
  } else {
    data = {
      user: user,
    };
  }

  res.status(200).render("user", { data });
});

// user can view account update form
app.get("/users/:username/update-account", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  res.status(200).render("userUpdate", { user });
});

// user sends udpate account request
app.post("/users/:username/update-account", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const udpatedUsername = req.body.username;
  const updatedFullName = req.body.fullName;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedIsAdmin = req.body.isAdmin;

  await user.set({
    username: udpatedUsername === "" ? user.username : udpatedUsername,
    fullName: updatedFullName === "" ? user.fullName : updatedFullName,
    email: updatedEmail === "" ? user.email : updatedEmail,
    password: updatedPassword === "" ? user.password : updatedPassword,
    isAdmin: updatedIsAdmin === "" ? user.isAdmin : updatedIsAdmin,
  });

  await user.save();

  res.status(200).redirect(`/users/${user.username}`);
});

// user deletes account
app.post("/users/:username/delete-profile", async (req, res) => {
  const user = await User.findByPk(req.params.username);

  await user.destroy();

  res.redirect(301, "homepage");
});

// user can view create item form
app.get("/users/:username/create-item", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  res.status(200).render("itemCreate", { user });
});

// user submits create item payload
app.post("/users/:username/create-item", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const newTitle = req.body.title;
  const newStock = req.body.stock;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  const newCategory = req.body.category;
  const newImage = req.body.image;

  const newItem = await Item.create({
    title: newTitle,
    stock: newStock,
    price: newPrice,
    description: newDescription,
    category: newCategory,
    image: newImage,
    clickCount: 0,
    UserUsername: user.username,
  });

  res.status(200).redirect(`/users/${user.username}/items/${newItem.id}`);
});

// item homepage
app.get("/users/:username/items/:id", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);
  const data = {
    item: item,
    user: user,
  };
  res.render("item", { data });
});

// TODO:
// user can view update item form
app.get("/users/:username/items/:id/update-item", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  const data = {
    user: user,
    item: item,
  };

  res.status(200).render("itemUpdate", { data });
});

// user can submit item update
app.post("/users/:username/items/:id/update-item", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  const updatedTitle = req.body.title;
  const updatedStock = req.body.stock;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;
  const updatedImage = req.body.image;

  await item.set({
    title: updatedTitle === "" ? item.title : updatedTitle,
    stock: updatedStock === "" ? item.stock : updatedStock,
    price: updatedPrice === "" ? item.price : updatedPrice,
    description:
      updatedDescription === "" ? item.description : updatedDescription,
    category: updatedCategory === "default" ? item.category : updatedCategory,
    image: updatedImage === "" ? item.image : updatedImage,
    clickCount: item.clickCount,
  });

  await item.save();

  res.status(200).redirect(301, `/users/${user.username}/items/${item.id}/`);
});

// user can delete item
app.post("/users/:username/items/:id/delete-item", async (req, res) => {
  const user = await User.findByPk(req.params.username);
  const item = await Item.findByPk(req.params.id);

  await item.destroy();

  res.status(200).redirect(`/users/${user.username}`);
});

app.listen(port, () => {
  console.log("Server is running!");
});
