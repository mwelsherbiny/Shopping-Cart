export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    this.root.appendChild(style);

    async function loadCSS() {
      const request = await fetch("components/MenuPage.css");
      const css = await request.text();
      style.textContent = css;
    }

    loadCSS();
  }

  connectedCallback() {
    const template = document.querySelector("#menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.render();

    window.addEventListener("appmenuchange", () => this.render());
  }

  render() {
    if (app.Store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.Store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;
        this.root.querySelector("#menu").appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = `Loading...`;
    }
  }
}

customElements.define("menu-page", MenuPage);
