let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const wishlistContainer = document.querySelector(".wishlistContainer");

function renderWishlist() {
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <h1 class="text-3xl font-bold col-span-4 text-center text-gray-500 mt-20">
        Your Wishlist is Empty
      </h1>
    `;
    return;
  }

  wishlist.forEach((product) => {
    const card = document.createElement("div");
    card.className = "shadow-lg rounded-2xl p-4 flex flex-col gap-3 bg-white";

    card.innerHTML = `
      <img
        class="h-[250px] object-cover rounded-xl bg-gray-100"
        src="${product.images[0]}"
        alt="${product.title}"
        onerror="this.src='https://placehold.co/300x300?text=No+Image'"
      />

      <h2 class="text-xl font-bold text-gray-800 line-clamp-1">
        ${product.title}
      </h2>

      <p class="text-lg text-indigo-600 font-semibold">
        $${product.price}
      </p>

      <button
        onclick="removeFromWishlist(${product.id})"
        class="bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition duration-300"
      >
        Remove
      </button>
    `;

    wishlistContainer.appendChild(card);
  });
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

renderWishlist();
