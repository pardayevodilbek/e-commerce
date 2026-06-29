let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".cartContainer");
const totalContainer = document.querySelector(".totalContainer");

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <h1 class="text-3xl font-bold col-span-4 text-center text-gray-500 mt-20">
        Your Cart is Empty
      </h1>
    `;
    totalContainer.innerHTML = "";
    return;
  }

  let totalPrice = 0;

  cart.forEach((product) => {
    const subtotal = product.price * product.quantity;
    totalPrice += subtotal;

    const card = document.createElement("div");
    card.className = "shadow-lg rounded-2xl p-4 flex flex-col gap-3 bg-white";

    card.innerHTML = `
      <img
        class="h-[250px] object-cover rounded-xl bg-gray-100"
        src="${product.images[0]}"
        alt="${product.title}"
        onerror="this.src='https://placehold.co/300x300?text=No+Image'"
      />

      <h2 class="text-xl font-bold text-gray-800">
        ${product.title}
      </h2>

      <p class="text-lg text-indigo-600 font-semibold">
        Price: $${product.price}
      </p>

      <div class="flex items-center gap-4">
        <button
          onclick="decreaseQuantity(${product.id})"
          class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg"
        >
          -
        </button>

        <span class="text-xl font-bold">
          ${product.quantity}
        </span>

        <button
          onclick="increaseQuantity(${product.id})"
          class="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg"
        >
          +
        </button>
      </div>

      <p class="text-lg font-bold text-gray-800">
        Subtotal: $${subtotal}
      </p>

      <button
        onclick="removeItem(${product.id})"
        class="bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition duration-300"
      >
        Remove Product
      </button>
    `;

    cartContainer.appendChild(card);
  });

  totalContainer.innerHTML = `
    <h1 class="text-3xl font-bold text-gray-900 bg-white shadow-lg px-6 py-4 rounded-2xl">
      Total Price: $${totalPrice}
    </h1>
  `;
}

renderCart();

function increaseQuantity(id) {
  cart = cart.map((item) => {
    if (item.id === id) {
      item.quantity++;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function decreaseQuantity(id) {
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
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
