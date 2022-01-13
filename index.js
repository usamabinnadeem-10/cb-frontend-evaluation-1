const findMenu = (categoryId, categories) => {
  let index = categories.findIndex((category) => category.id == categoryId);
  return categories[index][categoryId];
};

const createDummyData = (numberOfCategories, itemsPerCategory) => {
  const CATS = [
    "BAR-B-Q",
    "BURGER",
    "CHINESE",
    "DRINKS",
    "FRESH-JUICE",
    "ICE-CREAM",
    "MEATY",
    "PIZZA",
    "SALADS",
    "SEA-FOOD",
    "SOUPS",
    "SWEETS",
  ];

  if (numberOfCategories > CATS.length) {
    throw new Error(
      "Number of categories can not be greater than " + CATS.length
    );
  }

  return CATS.slice(0, numberOfCategories + 1).map((category, index) => {
    let menu = [];
    for (let i = 0; i < itemsPerCategory; i++) {
      menu.push({
        item_name: `ITEM-${i + 1}-${category}`,
        price: (i + 1) * 100,
      });
    }
    return {
      name: category,
      [category.replaceAll(" ", "")]: menu,
      id: category.replaceAll(" ", ""),
    };
  });
};

// creating dummy data
const CATEGORIES = createDummyData(12, 8);
let CART = {};
let GRAND_TOTAL = 0;

const updateCartHTML = (newCart) => {
  let CART = newCart;
  let cartHTML = ``;
  let cartTotal = 0;
  for (const key in CART) {
    cartHTML += `
    <div class="cart-container__item flex-col">
      <h5
        class="fw-500 cart-container__item__heading"
        id="cart-container__item__heading"
      >
        ${key}
      </h5>
      <!-- CART ITEM DETAILS -->
      <div class="cart-container__item__details flex-row">
        <div class="cart-container__item__details__controls flex-row">
          <h5 id=${`${key}`} onClick="changeQuantity(this, false)" class="pointer" id="control-minus">-</h5>
          <h5>${CART[key].quantity}</h5>
          <h5 id=${key} onClick="changeQuantity(this, true)" class="pointer" id="control-plus">+</h5>
        </div>
        <h5>${CART[key].quantity} kg</h5>
        <div class="flex-col cart-container__item__details__total">
          <h6 class="text-secondary">Total</h6>
          <h5>RS ${CART[key].price}</h5>
        </div>
      </div>
    </div>
    `;
    cartTotal += CART[key].price;
  }

  document.getElementById("cart-grandTotal").innerHTML = `Rs ${cartTotal}`;
  document.getElementById("cart").innerHTML = cartHTML;
};

const changeQuantity = (e, add) => {
  let item = e.id;
  // debugger;
  let unitPrice = CART[item].price / CART[item].quantity;
  let quantity = CART[item].quantity;
  if (!add && quantity - 1 <= 0) {
    delete CART[item];
    updateCartHTML(CART);
    return;
  }
  CART = {
    ...CART,
    [item]: {
      quantity: add ? quantity + 1 : quantity - 1,
      price: add ? (quantity + 1) * unitPrice : (quantity - 1) * unitPrice,
    },
  };
  updateCartHTML(CART);
};

// add items to cart
const handleAddToCart = (e) => {
  let itemDetails = e.id.split("--");
  let selectedItem = findMenu(itemDetails[0], CATEGORIES)[itemDetails[1]];
  let roundCount = document.getElementById("cart-header__round__count");
  let regularCount = document.getElementById("cart-header__regular__count");
  let isNewItem = false;
  if (selectedItem.item_name in CART) {
    CART = {
      ...CART,
      [selectedItem.item_name]: {
        quantity: CART[selectedItem.item_name].quantity + 1,
        price: (CART[selectedItem.item_name].quantity + 1) * selectedItem.price,
      },
    };
  } else {
    isNewItem = true;
    CART[selectedItem.item_name] = {
      quantity: 1,
      price: selectedItem.price,
    };
  }

  let numberOfUniqueItems = Object.keys(CART).length;
  roundCount.innerHTML = numberOfUniqueItems;
  regularCount.innerHTML = `00${numberOfUniqueItems}`;

  updateCartHTML(CART);
};

const generateMenu = () => {
  // create menu
  let activeCategory = document.getElementsByClassName("category--active")[0];

  let menuArray = findMenu(activeCategory.id, CATEGORIES);
  let menu = ``;
  for (let i = 0; i < menuArray.length; i++) {
    let currentMenuItem = menuArray[i];
    menu += `<div class="menu-container__item flex-col">
              <h5 class="fw-500">${currentMenuItem.item_name}</h5>
              <div class="flex-row menu-container__item__price">
                <h6 class="fw-400 text-secondary">RS ${
                  currentMenuItem.price
                }</h6>
              </div>
              <button id=${`${activeCategory.id}--${i}`} onClick="handleAddToCart(this)" class="menu-container__item__button pointer">ADD TO CART</button>
            </div>`;
  }
  document.getElementById("menu").innerHTML = menu;
};

// click handler for categories
const categoryClickHandler = (e) => {
  let active = "category--active";

  let activeDiv = document.getElementById(e.id);
  let allDivs = document.getElementsByClassName(active);

  // remove active from divs other than clicked div
  for (let i = 0; i < allDivs.length; i++) {
    if (allDivs[i].id !== activeDiv) {
      allDivs[i].classList.remove(active);
    }
  }

  if (activeDiv.classList.contains(active)) {
    activeDiv.classList.remove(active);
  } else {
    activeDiv.classList.add(active);
  }

  generateMenu();
};

const openCategoriesHandler = (e) => {
  let categoriesContainer = document.getElementById('categories-container').classList;
  let current = document.getElementById('open-or-close');
  let circle = document.getElementById('open-categories-div').classList;
  if (categoriesContainer.contains('hidden')){
    current.innerHTML = 'CLOSE';
    categoriesContainer.remove('hidden');
    categoriesContainer.add('visible-flex');
    circle.add('open-categories-div--categories-open');
  } else if (categoriesContainer.contains('visible-flex')){
    current.innerHTML = 'MENU'
    categoriesContainer.add('hidden');
    categoriesContainer.remove('visible-flex');
    circle.remove('open-categories-div--categories-open')
  } else {
    current.innerHTML = 'CLOSE';
    categoriesContainer.add('visible-flex');
    circle.add('open-categories-div--categories-open');
  }
}

// create categories
for (let i = 0; i < CATEGORIES.length; i++) {
  document.getElementById(
    "category-map"
  ).innerHTML += `<div onClick="categoryClickHandler(this)" id=${CATEGORIES[
    i
  ].name.replaceAll(" ", "")} class="flex-row category pointer ${
    i === 0 ? "category--active" : ""
  }">
                    <h5 class="fw-400">${CATEGORIES[i].name}</h5>
                    <h5 class="fw-200">></h5>
                  </div>`;
}

// initially click first category by default
document.getElementById(CATEGORIES[0].id).click();

document.getElementById("category-count").innerHTML = `(${CATEGORIES.length})`;
