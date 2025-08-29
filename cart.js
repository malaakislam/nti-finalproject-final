document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("role");
        window.location.href = "login.html";
      });
    }
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn || loggedIn !== "true") {
      alert("You must be signed in to view this page.");
      window.location.href = "home.html"; 
    }
    const cartContainer = document.getElementById("cartContainer");
    const totalPriceElement = document.getElementById("totalPrice");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    
    let cartWithQty = [];
    cart.forEach(item => {
      let existing = cartWithQty.find(p => p.id === item.id);
      if (existing) existing.quantity += 1;
      else cartWithQty.push({ ...item, quantity: 1 });
    });
  
    function renderCart() {
      cartContainer.innerHTML = "";
      let total = 0;
  
      if (cartWithQty.length === 0) {
        cartContainer.innerHTML = "<p class='text-center text-muted p-5'>Your cart is empty.</p>";
        totalPriceElement.innerHTML = "<p class='p-4'>Total: $0</p>";

        return;
      }
  
      cartWithQty.forEach((product, index) => {
        let subtotal = product.price * product.quantity;
        total += subtotal;
  
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3 mb-4 ";
  
        col.innerHTML = `
          <div class="cart-card h-100 ">
            <img src="${product.image}" class="cart-card-img-top" alt="${product.name}">
            <div class="cart-card-body text-center">
              <h5 class="cart-card-title p-2">${product.name}</h5>
              <p class="cart-card-text fw-bold ">$${product.price} x ${product.quantity} = $${subtotal.toFixed(2)}</p>
              <button class="cart-btn-remove w-50 m-2 rounded-pill">Remove</button>
            </div>
          </div>
        `;
  
        col.querySelector(".cart-btn-remove").addEventListener("click", () => removeFromCart(index));
        cartContainer.appendChild(col);
      });
  
      totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  
    function removeFromCart(index) {
      Swal.fire({
        title: "Are you sure?",
        text: "This product will be removed from your cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F79489",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Yes, remove it!"
      }).then(result => {
        if (result.isConfirmed) {
          cartWithQty.splice(index, 1);
          cart = cartWithQty.flatMap(p => Array(p.quantity).fill({ id: p.id, name: p.name, price: p.price, image: p.image }));
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
          Swal.fire("Removed!", "The product has been removed.", "success");
        }
      });
    }
  
    renderCart();
  });

  
