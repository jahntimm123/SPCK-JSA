if (localStorage.getItem("accounts") === null) {
  localStorage.setItem("accounts", JSON.stringify([]));
}
if (localStorage.getItem("selectedItems") === null) {
  localStorage.setItem("selectedItems", JSON.stringify([]));
}

fetch("https://fakestoreapi.com/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    result.forEach(function (item, index) {
      const container = document.getElementById("container");
      const card = document.createElement("div");
      const productImage = document.createElement("img");
      const cardBody = document.createElement("div");
      const productName = document.createElement("h5");
      const description = document.createElement("p");
      const button = document.createElement("a");

      productImage.src = item.image;
      productName.innerText = item.title;
      description.innerText = item.description;
      button.innerText = "Give a present";

      card.classList.add("card");
      productImage.classList.add("card-img-top");
      cardBody.classList.add("card-body");
      productName.classList.add("card-title");
      description.classList.add("card-text");
      button.classList.add("btn");
      button.classList.add("btn-primary");

      button.addEventListener("click", () => {
        addToSelectedItems(item);
      });

      cardBody.appendChild(productName);
      cardBody.appendChild(description);
      cardBody.appendChild(button);

      card.appendChild(productImage);
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function addToSelectedItems(item) {
  let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  const existingItemIndex = selectedItems.findIndex(
    (matchItem) => matchItem.id === item.id
  );

  if (existingItemIndex !== -1) {
    selectedItems[existingItemIndex].quantity++;
  } else {
    item.quantity = 1;
    selectedItems.push(item);
  }

  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

function addToMyProducts(item) {
  const currentUser = localStorage.getItem("loggedInUser");

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const currentUserIndex = accounts.findIndex(
    (user) => user.username === currentUser
  );
  console.log("User index" + currentUserIndex);
  if (currentUserIndex !== -1) {
    let myProducts = accounts[currentUserIndex].myProducts || [];

    const existingItemIndex = myProducts.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      alert("Have already had this present");
    } else {
      
      item.quantity = 1;
      myProducts.push(item);
      const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
      const findItemIndex = selectedItems.findIndex(
        (matchedItem) => matchedItem.id === item.id
      );
      if (findItemIndex !== -1) {
        if (selectedItems[findItemIndex].quantity === 1) {
          selectedItems.splice(findItemIndex, 1);
        } else {
          selectedItems[findItemIndex].quantity += -1;
        }
      }
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      printAvailable();
      alert("Received present");
    }

    accounts[currentUserIndex].myProducts = myProducts;

    localStorage.setItem("accounts", JSON.stringify(accounts));


  }
}

function printAvailable() {
  console.log(JSON.parse(localStorage.getItem("selectedItems")));

  let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  const availableContainer = document.getElementById("available-container");
  availableContainer.innerHTML = "";
  selectedItems.forEach(function (item, index) {
    const card = document.createElement("div");
    const productImage = document.createElement("img");
    const cardBody = document.createElement("div");
    const productName = document.createElement("h5");
    const description = document.createElement("p");
    const button = document.createElement("a");
    const quantityShow = document.createElement("div");

    productImage.src = item.image;
    productName.innerText = item.title;
    description.innerText = item.description;
    button.innerText = "Receive present";
    quantityShow.innerText = `Quantity: ${item.quantity}`;

    card.classList.add("card");
    productImage.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    productName.classList.add("card-title");
    description.classList.add("card-text");
    button.classList.add("btn");
    button.classList.add("btn-primary");

    button.addEventListener("click", () => {
      addToMyProducts(item);
    });

    cardBody.appendChild(productName);
    cardBody.appendChild(description);
    cardBody.appendChild(button);
    cardBody.appendChild(quantityShow);

    card.appendChild(productImage);
    card.appendChild(cardBody);
    availableContainer.appendChild(card);
  });
}
printAvailable();

