const modal = document.querySelector(".modal");

class CatalogCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(this.build());
    this.appendChild(this.style());
  }

  build() {
    const id = this.getAttribute("cardId");
    const name = this.getAttribute("name");
    const image = this.getAttribute("image");

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "card");

    const innerCard = document.createElement("div");
    innerCard.setAttribute("class", "innerCard");

    const title = document.createElement("p");
    title.innerText = name;
    innerCard.appendChild(title);

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Foto do ${name}`;
    innerCard.appendChild(img);

    componentRoot.appendChild(innerCard);

    innerCard.onclick = () => {
      modal.innerHTML = "";
      modal.style.display = "flex";

      const fullCard = document.createElement("full-card");
      fullCard.setAttribute("cardId", id);
      fullCard.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      modal.appendChild(fullCard);
    };

    return componentRoot;
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `
    .card {
      user-select: none;
      padding: 10px;
      height: 220px;
      border-radius: 10px;
      width: 235px;
      background-color: var(--primary-color);
      cursor: pointer;
    }
    
    .innerCard {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border: 2px solid var(--secondary-color);
      border-radius: 10px;
      width: 100%;
      height: 100%;
      color: var(--white);
      padding: 10px 0;
    }
    
    img {
      -webkit-user-drag: none;
      padding: 0;
      width: 80%;
      height: 150px
      border: 1px solid black;
      object-fit: fill;
      border-radius: 10px;
    }
    
    `;

    return style;
  }
}

customElements.define("catalog-card", CatalogCard);
