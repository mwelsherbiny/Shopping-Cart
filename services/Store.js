const Store = {
  menu: null,
  cart: [],

  async loadMenu() {
    this.menu = await app.API.fetchMenu();
  },

  async getProductById(id) {
    if (app.Store.menu == null) {
      await loadData();
    }
    for (let c of app.Store.menu) {
      for (let p of c.products) {
        if (p.id == id) {
          return p;
        }
      }
    }
    return null;
  },

  async addToCart(id) {
    const product = await this.getProductById(id);
    const results = app.Store.cart.find(
      (cartProd) => cartProd.product.id === id
    );

    if (results) {
      app.Store.cart = app.Store.cart.map((prodCart) =>
        prodCart.product.id === id
          ? { ...prodCart, quantity: prodCart.quantity + 1 }
          : prodCart
      );
    } else {
      app.Store.cart = [...app.Store.cart, { product, quantity: 1 }];
    }
  },

  async removeFromCart(id) {
    app.Store.cart = app.Store.cart.filter(
      (cartProd) => cartProd.product.id !== id
    );
  },
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    if (property === "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    } else if (property === "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }

    return true;
  },
});

export default proxiedStore;
