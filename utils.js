export const findMenu = (categoryId, categories) => {
  return categories.findIndex((category) => {
    category.id = categoryId;
  });
};

export const createDummyData = (numberOfCategories, itemsPerCategory) => {
  const CATS = [
    "BAR B Q",
    "BURGER",
    "CHINESE",
    "DRINKS",
    "FRESH JUICE",
    "ICE CREAM",
    "MEATY",
    "PIZZA",
    "SALADS",
    "SEA FOOD",
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
        item_name: `ITEM - ${i + 1} : ${category}`,
        price: (i + 1) * 100,
      });
    }
    return {
      name: category,
      [category.replaceAll(" ", "")]: menu,
    };
  });
};

export const generateMenu = () => {
  // create menu
  let activeCategory = document.getElementsByClassName("category--active")[0];
  let menu = ``;
  for (let i = 0; i < categories[activeCategory.id].length; i++) {
    let currentMenuItem = categories[activeCategory.id][i];
    menu += `<div class="menu-container__item flex-col">
              <h5 class="fw-500">${currentMenuItem.item_name}</h5>
              <div class="flex-row menu-container__item__price">
                <h6 class="fw-400 text-secondary">RS ${currentMenuItem.price}</h6>
              </div>
              <button class="menu-container__item__button">ADD TO CART</button>
            </div>`;
  }
  document.getElementById("menu").innerHTML;
};
