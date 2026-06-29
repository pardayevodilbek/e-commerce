async function fetchProducts() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = "";
  allProducts = products;

  Array.isArray(products) &&
    products.forEach((product) => {
      const exists = wishlist.some((item) => item.id === product.id);
      const existsCart = cart.some((el) => el.id === product.id);
      const cartQuantity = cart.find((item) => item.id === product.id);

      let card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img
          class="max-h-[300px] min-h-[300px] w-full object-cover rounded-xl bg-gray-100"
          src="${product.images[0]}"
          alt="${product.title}"
          onerror="this.src='https://placehold.co/300x300?text=No+Image'"
        />

        <h3 class="text-lg font-semibold text-gray-800 mt-4 line-clamp-1">
          ${product.title}
        </h3>

        <p class="text-2xl font-bold text-indigo-600 mt-2">
          $${product.price}
        </p>

        <button
          onclick="addToWishlist(${product.id})"
          class="mt-4 w-full py-3 rounded-xl text-white font-medium transition duration-300 ${
            exists
              ? "bg-green-500 hover:bg-green-600"
              : "bg-indigo-500 hover:bg-indigo-600"
          }"
        >
          ${exists ? "✓ Added" : "+ Add to Wishlist"}
        </button>

        ${
          existsCart
            ? `
          <div class="flex items-center gap-3 mt-4">
            <button
              onclick="decreaseQuantityHome(${product.id})"
              class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg"
            >
              -
            </button>

            <span class="text-xl font-bold">
              ${cartQuantity.quantity}
            </span>

            <button
              onclick="increaseQuantityHome(${product.id})"
              class="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg"
            >
              +
            </button>
          </div>
        `
            : `
          <button
            onclick="addToCart(${product.id})"
            class="mt-4 w-full py-3 rounded-xl text-white font-medium bg-red-500 transition duration-300 hover:bg-red-600"
          >
            + Add to Cart
          </button>
        `
        }
      `;

      productsContainer.appendChild(card);
    });
}

async function addToWishlist(id) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const product = await response.json();

    const exists = wishlist.some((item) => item.id === id);

    if (exists) {
      wishlist = wishlist.filter((item) => item.id !== id);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateBadges();
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
}

async function addToCart(id) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const product = await response.json();

    const exists = cart.some((item) => item.id === id);

    if (!exists) {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadges();
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

function increaseQuantityHome(id) {
  cart = cart.map((item) => {
    if (item.id === id) {
      item.quantity++;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadges();
  renderProducts(allProducts);
}

function decreaseQuantityHome(id) {
  const product = cart.find((item) => item.id === id);

  if (product.quantity > 1) {
    cart = cart.map((item) => {
      if (item.id === id) {
        item.quantity--;
      }
      return item;
    });
  } else {
    cart = cart.filter((item) => item.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadges();
  renderProducts(allProducts);
}

fetchProducts();
