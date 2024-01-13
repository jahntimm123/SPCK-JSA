function printMyPresent() {
    const currentUser = localStorage.getItem("loggedInUser");

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  
    const findUser = accounts.find((user) => user.username === currentUser);

    const myItems = findUser.myProducts;

    myItems.forEach(function (item, index) {
      const myPresentContainer = document.getElementById("my-present-container");
      const card = document.createElement("div");
      const productImage = document.createElement("img");
      const cardBody = document.createElement("div");
      const productName = document.createElement("h5");
      const description = document.createElement("p");
      const quantityShow = document.createElement("div");
  
      productImage.src = item.image;
      productName.innerText = item.title;
      description.innerText = item.description;
  
      quantityShow.innerText = `Quantity: ${item.quantity}`;
  
      card.classList.add("card");
      productImage.classList.add("card-img-top");
      cardBody.classList.add("card-body");
      productName.classList.add("card-title");
      description.classList.add("card-text");
  
      cardBody.appendChild(productName);
      cardBody.appendChild(description);
     
      cardBody.appendChild(quantityShow);
  
      card.appendChild(productImage);
      card.appendChild(cardBody);
      myPresentContainer.appendChild(card);
      console.log(index);
    });

  }
  printMyPresent();