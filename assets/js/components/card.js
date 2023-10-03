const catalogItems = JSON.parse(localStorage.getItem("catalogItems"));
const modal = document.querySelector(".modal");

class Card extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(this.build());
    this.appendChild(this.style());
  }

  build() {
    const id = this.getAttribute("cardId");

    const cardIndex = catalogItems.findIndex((card) => card.id == id);

    const name = catalogItems[cardIndex].name;
    const image = catalogItems[cardIndex].image;
    const characteristics = catalogItems[cardIndex].characteristics;
    const review = catalogItems[cardIndex].review;
    const price = catalogItems[cardIndex].price;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "fullCard");

    const innerCard = document.createElement("div");
    innerCard.setAttribute("class", "innerCard");

    const title = document.createElement("h3");
    title.innerText = name;
    innerCard.appendChild(title);

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Foto do ${name}`;
    innerCard.appendChild(img);

    const characteristicsP = document.createElement("p");
    characteristicsP.setAttribute("class", "characteristics");
    characteristicsP.innerText = characteristics;
    innerCard.appendChild(characteristicsP);

    const reviewDiv = document.createElement("div");
    reviewDiv.setAttribute("class", "review");

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("img");
      i <= review
        ? (star.src = "/assets/images/checkedstar.svg")
        : (star.src = "/assets/images/uncheckedstar.svg");
      reviewDiv.appendChild(star);
    }
    innerCard.appendChild(reviewDiv);

    const priceP = document.createElement("p");
    priceP.innerText = `Preço: ${price}`;
    innerCard.appendChild(priceP);

    const buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons");

    const editButton = document.createElement("button");
    editButton.setAttribute("class", "cardButton");
    editButton.innerText = "🖉";

    editButton.onclick = () => {
      window.location.href = `cadastro.html?id=${id}`;
    };
    buttons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "cardButton");
    deleteButton.innerText = "🗑";

    deleteButton.onclick = () => {
      catalogItems.splice(cardIndex, 1);

      localStorage.setItem("catalogItems", JSON.stringify(catalogItems));
      modal.style.display = "none";
    };
    buttons.appendChild(deleteButton);

    innerCard.appendChild(buttons);

    componentRoot.appendChild(innerCard);

    return componentRoot;
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `
    .fullCard {
      width: 350px;
      user-select: none;
      background-color: var(--primary-color);
      border-radius: 10px;
      padding: 10px;
      height: 550px;
    }

    .characteristics {
      text-align: center;
      width: 80%;
    }

    .review {
      display: flex;
    }

    .review > img {
      width: 20px;
    }

    .buttons {
      display: flex;
      gap: 10px;
      width: 80%;
    }

    .cardButton {
      font-size: 24px;
      height: 30px;
      width: 50%;
      border: none;
      background-color: var(--white);
      border-radius: 10px;
      cursor: pointer;
    }

    .cardButton:hover {
      filter: brightness(85%);
    }
    `;

    return style;
  }
}

customElements.define("full-card", Card);
