document.addEventListener("DOMContentLoaded", () => {

    const loggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");
  
    if (!loggedIn || role !== "admin") {
      alert("Access denied. Admins only.");
      window.location.href = "login.html";
    }
  
   
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("role");
        window.location.href = "login.html";
      });
    }
  
    
    const form = document.getElementById("addProductForm");
    if (!form) return;
  
    form.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const name = document.getElementById("productName").value.trim();
      const price = parseFloat(document.getElementById("productPrice").value.trim());
      const category = document.getElementById("productCategory").value;
      const image = document.getElementById("productImage").value.trim();
      const oldPriceValue = document.getElementById("productOldPrice").value.trim();
      const oldPrice = oldPriceValue ? parseFloat(oldPriceValue) : null;
  
      if (!name || !price || !category || !image) {
        Swal.fire("Error", "Please fill in all required fields!", "error");
        return;
      }
  
      const newProduct = { id: Date.now(), name, price, category, image };
      if (oldPrice) newProduct.oldPrice = oldPrice;
  
      let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      storedProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(storedProducts));
  
      Swal.fire({
        title: "Product Added!",
        text: `${name} has been successfully added.`,
        icon: "success",
        confirmButtonText: "Go to Products"
      }).then(() => {
        window.location.href = "products.html";
      });
    });
  });
  