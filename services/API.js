const API = {
  url: "/data/menu.json",

  async fetchMenu() {
    const request = await fetch(this.url);
    return await request.json();
  },
};

export default API;
