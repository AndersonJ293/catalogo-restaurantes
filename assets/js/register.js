let catalogItems = JSON.parse(localStorage.getItem("catalogItems")) || [];

const form = document.querySelector("#form");
const review = document.querySelector("input[type=range]");
const reviewValue = document.querySelector("#reviewValue");
const submitButton = document.querySelector("#button");
const title = document.querySelector("#title");

review.addEventListener("input", () => {
  reviewValue.innerText = review.value;
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const cardIndex = catalogItems.findIndex((card) => card.id == id);

if (id) {
  submitButton.value = "Atualizar";
  title.innerText = "Editar Restaurante";

  document.querySelector("#name").value = catalogItems[cardIndex].name;
  document.querySelector("#image").value = catalogItems[cardIndex].image;
  checkBoxes(catalogItems[cardIndex].characteristics);
  document.querySelector("#review").value = catalogItems[cardIndex].review;
  reviewValue.innerText = review.value;
  document.querySelector(
    `input[type="radio"][id="${catalogItems[cardIndex].price}"]`
  ).checked = true;
}

function checkBoxes(boxes) {
  const checkboxes = Array.prototype.slice.call(
    document.querySelector(".checkboxes").children
  );

  checkboxes.forEach((div) => {
    const label = div.querySelector("label");
    const input = div.querySelector("input");

    if (boxes.includes(label.innerText)) {
      input.checked = true;
    }
  });
}

// New item register form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // add the label text of an checked check box to checked array
  function checkedBoxes() {
    let checked = [];

    const checkboxes = Array.prototype.slice.call(
      document.querySelector(".checkboxes").children
    );

    checkboxes.forEach((div) => {
      const label = div.querySelector("label");
      const input = div.querySelector("input");

      if (input.checked) {
        checked.push(label.innerText);
      }
    });

    return checked;
  }

  function generateRandomId() {
    const maxId = 1000000000;
    return ((Math.random() * maxId) | 0).toString(36);
  }

  function displayError(form) {
    console.log(form);
    if (form) {
      document.querySelector("#error").innerText =
        "Preencha os campos em vermelho";
    } else {
      document.querySelector("#error").innerText = "";
    }
  }

  function validateForm() {
    let hasEmpty = false;
    document.querySelector("#image").style.border = "none";
    document.querySelector("#name").style.border = "none";
    document.querySelector(".checkboxes").style.border = "none";
    if (!newItem.name) {
      document.querySelector("#name").style.border = "1px solid red";
      hasEmpty = true;
    }

    if (!newItem.image) {
      document.querySelector("#image").style.border = "1px solid red";
      hasEmpty = true;
    }

    if (checkedBoxes().length === 0) {
      document.querySelector(".checkboxes").style.border = "1px solid red";
      hasEmpty = true;
    }

    return hasEmpty;
  }

  const newItem = {
    id: generateRandomId(),
    name: document.querySelector("#name").value,
    image: document.querySelector("#image").value,
    characteristics: checkedBoxes(),
    review: document.querySelector("#review").value,
    price: document.querySelector("input[type=radio]:checked").id,
  };

  displayError(validateForm());
  if (validateForm()) {
    return;
  }

  if (id) {
    newItem.id = id;
    catalogItems.splice(cardIndex, 1, newItem);
  } else {
    catalogItems.push(newItem);
  }
  localStorage.setItem("catalogItems", JSON.stringify(catalogItems));

  setTimeout(() => {
    window.location = "index.html";
  }, 1000);
});
