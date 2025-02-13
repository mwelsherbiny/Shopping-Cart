const Router = {
  init() {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        this.go(link.getAttribute("href"));
      });
    });

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    Router.go(location.pathname);
  },

  go(route, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        pageElement.textContent = "Order";
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          pageElement.textContent = "Details";
          const id = route.substring(route.indexOf("-") + 1);
          pageElement.dataset.id = id;
        }
    }

    if (pageElement) {
      const main = document.querySelector("main");
      main.children[0]?.remove();
      main.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
