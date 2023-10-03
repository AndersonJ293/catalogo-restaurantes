const catalog = document.querySelector(".catalog");
const modal = document.querySelector(".modal");

modal.addEventListener("click", (event) => {
  event.stopPropagation();
  modal.style.display = "none";
});

function updateList() {
  catalog.innerHTML = "";
  let catalogItems = JSON.parse(localStorage.getItem("catalogItems"));

  if (catalogItems && catalogItems.length > 0) {
    catalogItems.forEach((item) => {
      const newCard = document.createElement("catalog-card");
      newCard.setAttribute("cardId", item.id);
      newCard.setAttribute("name", item.name);
      newCard.setAttribute("image", item.image);

      catalog.appendChild(newCard);
    });
  } else {
    const warning = document.createElement("p");
    warning.innerText = "Ainda não foram adicionados restaurantes no catalogo.";

    catalog.appendChild(warning);
  }
  setTimeout(() => {
    console.log(2);
    updateList();
  }, 5000);
}

updateList();
