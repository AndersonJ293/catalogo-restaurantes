class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(this.build());
    this.appendChild(this.style());
  }

  build() {
    const componentRoot = document.createElement("nav");

    const title = document.createElement("a");
    title.href = "index.html";
    title.innerText = "CRUD";
    componentRoot.appendChild(title);

    const button = document.createElement("a");
    button.href = "cadastro.html";
    button.setAttribute("class", "addButton");
    button.innerText = "+";
    componentRoot.appendChild(button);

    return componentRoot;
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      width: 100vw;
      box-shadow: var(--primary-color) 0px 1px 1px -2px,
        var(--primary-color) 0px 2px 6px -3px;
      color: var(--primary-color);
    }
    
    nav > a {
      font-size: 25px;
      font-weight: 700;
      text-decoration: none;
      color: black
    }

    .addButton {
      padding: 2px 10px;
      border: 1px solid black;
    }
    `;

    return style;
  }
}

customElements.define("nav-bar", Navbar);
