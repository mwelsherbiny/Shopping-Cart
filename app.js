import API from "./services/API.js";
import Store from "./services/Store.js";
import Router from "./services/Router.js";

import MenuPage from "./components/MenuPage.js";
import DetailsPage from "./components/DetailsPage.js";
import OrderPage from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {
  Store,
  API,
  Router,
};

window.addEventListener("DOMContentLoaded", async () => {
  app.Store.loadMenu();
  app.Router.init();
});

window.addEventListener("appcartchange", () => {
  const badge = document.querySelector("#badge");
  const quantity = app.Store.cart.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );

  badge.textContent = quantity;
  badge.hidden = quantity === 0;
});
