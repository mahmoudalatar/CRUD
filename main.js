let productName = document.getElementById("productName");
let errorName = document.getElementById("errorMassage");
let productPrice = document.getElementById("productPrice");
let productCate = document.getElementById("productCate");
let productDesc = document.getElementById("productDesc");
let productBtn = document.getElementById("productBtn");
let updateProductBtn = document.getElementById("updateProduct");
let productSearch = document.getElementById("productSearch");
let itemIndex;
let productList = JSON.parse(localStorage.getItem("productList")) || [];
if (productList != []) {
  displayProduct(productList);
}

// show error name
productName.addEventListener("keydown", () => {
  validateProductName(productName.value);
});

// adding item
productBtn.addEventListener("click", () => {
  addProduct();
});
// updating item
updateProductBtn.addEventListener("click", () => {
  updateData();
});
// searching for item
productSearch.addEventListener("input", () => {
  searchItem(productSearch.value);
});

function addProduct() {
  if (validateProductName(productName.value)) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      category: productCate.value,
      desc: productDesc.value,
    };
    productList.push(product);
    saveLocal(productList);
    displayProduct(productList);
    clearForm();
  }
}


function displayProduct(list) {
  let myData = document.getElementById("myData");
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<tr>
              <td>${i + 1}</td>
              <td>${list[i].newName ? list[i].newName : list[i].name}</td>
              <td>${list[i].price}</td>
              <td>${list[i].category}</td>
              <td>${list[i].desc}</td>
              <td><button value="${i}" class="btn btn-warning updateBtn">Update</button></td>
              <td><button value="${i}" class="btn btn-danger deleteBtn">Delete</button></td>
            </tr>`;
  }
  myData.innerHTML = container;
  let updateBtn = document.querySelectorAll(".updateBtn");
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
      deleteProduct(deleteBtn[i].value);
    });
    updateBtn[i].addEventListener("click", () => {
      updateProduct(updateBtn[i].value);
      itemIndex = updateBtn[i].value;
    });
  }
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  saveLocal(productList);
}

// use temp var to combar if the same index or not
// if is it just toggle the class if not it will make update product btn stay
let temp;
function updateProduct(index) {
  if (temp == index) {
    updateProductBtn.classList.toggle("d-none");
    productBtn.classList.toggle("d-none");
  } else {
    updateProductBtn.classList.replace("d-none", "t-inline-block");
    productBtn.classList.add("d-none");
  }
  productBtn.classList.contains("d-none")
    ? clearForm(productList[index])
    : clearForm();
  temp = index;
}

function updateData() {
  if (validateProductName(productName.value)) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      category: productCate.value,
      desc: productDesc.value,
    };
    productList.splice(itemIndex, 1, product);
    saveLocal(productList);
    displayProduct(productList);
    clearForm();
    updateProductBtn.classList.toggle("d-none");
    productBtn.classList.toggle("d-none");
  }
}

function searchItem(item) {
  let searchedItem = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(item.toLowerCase())) {
      productList[i].newName = productList[i].name.replace(
        item,
        `<span class="text-danger fw-bold">${item}</span>`
      );
      searchedItem.push(productList[i]);
    }
  }
  displayProduct(searchedItem);
}

function clearForm(product = []) {
  productName.value = product.name || "";
  productPrice.value = product.price || "";
  productCate.value = product.category || "";
  productDesc.value = product.desc || "";
}

function saveLocal(list) {
  localStorage.setItem("productList", JSON.stringify(list));
}

function validateProductName(name) {
  let regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(name)) {
    errorName.classList.add("d-none");
    return true;
  } else {
    errorName.classList.remove("d-none");
    return false;
  }
}
