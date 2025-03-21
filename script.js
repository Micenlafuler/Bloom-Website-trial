document.addEventListener("DOMContentLoaded", function () {
  /* ===== SUBSCRIBE BUTTON ===== */
  const subscribeButton = document.getElementById("subscribe-btn");
  if (subscribeButton) {
    subscribeButton.addEventListener("click", function () {
      alert("Thank you for subscribing");
    });
  }

  /* ===== SHOPPING CART FUNCTIONALITY ===== */
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  function saveCart() {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((item, index) => {
      cartItemsContainer.innerHTML += `
        <li>${item.name} (x${item.quantity})
          <span class="cart-item-buttons" onclick="increaseQuantity(${index})">➕</span>
          <span class="cart-item-buttons" onclick="decreaseQuantity(${index})">➖</span>
        </li>
      `;
    });
  }

  /* Increase quantity */
  window.increaseQuantity = function(index) {
    cart[index].quantity++;
    saveCart();
    updateCartDisplay();
  };

  /* Decrease quantity */
  window.decreaseQuantity = function(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    saveCart();
    updateCartDisplay();
  };

  /* Add to cart buttons */
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const itemName = this.parentElement.querySelector(".caption").innerText;
      const existingItem = cart.find(item => item.name === itemName);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name: itemName, quantity: 1 });
      }

      saveCart();
      alert("Item added to the cart");
    });
  });

  /* View Cart Modal */
  const viewCartButton = document.getElementById("view-cart");
  const cartModal = document.getElementById("cart-modal");
  const closeCartButton = document.getElementById("close-cart");
  const closeBtn = document.querySelector(".close-btn");

  if (viewCartButton && cartModal && closeCartButton) {
    viewCartButton.addEventListener("click", function () {
      updateCartDisplay();
      cartModal.style.display = "flex";
    });

    closeCartButton.addEventListener("click", function () {
      cartModal.style.display = "none";
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        cartModal.style.display = "none";
      });
    }
  }

  /* Clear Cart */
  const clearCartButton = document.getElementById("clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      if (cart.length > 0) {
        cart = [];
        sessionStorage.removeItem("cart");
        updateCartDisplay();
        alert("Cart cleared");
      } else {
        alert("No items to clear");
      }
    });
  }

  /* Process Order */
  const processOrderButton = document.getElementById("process-order");
  if (processOrderButton) {
    processOrderButton.addEventListener("click", function () {
      if (cart.length > 0) {
        alert("Thank you for your order");
        cart = [];
        sessionStorage.removeItem("cart");
        updateCartDisplay();
      } else {
        alert("Cart is empty");
      }
    });
  }

  /* ===== CONTACT FORM MODAL ===== */
  const contactForm = document.getElementById("contact-form");
  const confirmationModal = document.getElementById("confirmation-modal");
  const closeModalButton = document.getElementById("close-modal");

  if (contactForm && confirmationModal && closeModalButton) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const feedback = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        date: new Date().toISOString()
      };

      localStorage.setItem("userFeedback", JSON.stringify(feedback));
      contactForm.reset();
      confirmationModal.style.display = "flex";
    });

    closeModalButton.addEventListener("click", function () {
      confirmationModal.style.display = "none";
    });

    const xBtn = document.querySelector(".close-btn");
    if (xBtn) {
      xBtn.addEventListener("click", function () {
        confirmationModal.style.display = "none";
      });
    }
  }
});
