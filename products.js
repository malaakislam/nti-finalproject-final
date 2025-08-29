document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "login.html";
    }
  
    document.getElementById("logoutBtn").addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
      window.location.href = "login.html";
    });
  
    let products = [
        { id: 1, name: "Grime Face Scrub", price: 25, category: "skincare", image: "https://i.ebayimg.com/images/g/2b8AAOSw-npgQPuw/s-l1200.jpg" },
        { id: 2, name: "Clarifying Face Wash", price: 35, category: "skincare", image: "https://www.beautybar.com.cy/cdn/shop/files/FLOR1009_09a253eb-ff25-46d6-96d6-1aa9c8d75ffa_800x.jpg" },
        { id: 3, name: "Golden Dusk Highlighter", price: 28, category: "face", image: "https://houseofbeauty.com.pl/public/files/productphoto/org/sunkissed_glow_61dab28c21c4a.jpg" },
        { id: 4, name: "Soft Blush Powder", price: 20, category: "face", image: "https://images.asos-media.com/products/florence-by-mills-cheek-me-later-cream-blush-zen-z/20642936-1-zenz?$n_640w$&wid=513&fit=constrain" },
        { id: 5, name: "Velvet Liquid Lipstick", price: 40, category: "lips", image: "https://media.douglas.it/medias/qnd8R9493434-0-global.jpg?context=bWFzdGVyfGltYWdlc3w5NjQ0NHxpbWFnZS9qcGVnfGFEY3hMMmd5Tmk4Mk16WTBOemc0TURFNE16Z3pPQzl4Ym1RNFVqazBPVE0wTXpSZk1GOW5iRzlpWVd3dWFuQm58YjNjMGY2MTU4MTQ5YzA3YjgxNGMxMDZlNTJlNWI4NjUwZTY1Nzc0MjczMzRiMTZiMDVlMjc3ZWFkOTA2OTY5ZQ&grid=true&imPolicy=grayScaled" },
        { id: 6, name: "Glow Lip Oil", price: 22, category: "lips", image: "https://images.beautybay.com/eoaaqxyywn6o/FLOR0010F_1.jpg_s3.lmb_0jwh4l/acba9b4589d40ee1c4c0e1200d027303/FLOR0010F_1.jpg" },
        { id: 7, name: "Clear Lip Balm", price: 30, category: "lips", image: "https://skincarebyself.com/cdn/shop/files/FLOR0092F_1.jpg?v=1731843687&width=1445" },
        { id: 8, name: "Look Alive Eye Cream", price: 24, category: "eyes", image: "https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/12645503-1784898514660351.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover" },
        { id: 9, name: "All Eyes On Eyeshadow palette", price: 70, category: "eyes", image: "https://www.hagel-shop.de/media/catalog/product/1/2/12112591_1_9ssss3xxdusq3tf3.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" },
        { id: 10, name: "Eye Candy Eyeshadow Stick", price: 37, category: "eyes", image: "https://florencebymillsbeauty.com/cdn/shop/files/FBM_EYECANDY_LOLLI_SILO_2700x4070_042525.jpg?v=1746652609&width=1350" },
        { id: 11, name: "Summer Holiday Essentials", price: 120, category: "summer", image: "https://thebeautycrop.co.uk/cdn/shop/files/Category_Banner_-_Mobile-3.jpg?v=1747213649" },
        { id: 12, name: "The Sundle Bundle", price: 120, category: "summer", image: "https://www.fabulousmakeup.co.uk/cdn/shop/files/image00023.jpg?v=1750969083" },
        { id: 13, name: "The Very Berry Set", oldPrice: 160, price: 80, category: "exclusive", image: "https://www.telofill.com/cdn/shop/files/The_Very_Berry_Bodylicious_Bundle.jpg?v=1753785151&width=1946" },
        { id: 14, name: "The Best Teas Set", oldPrice: 180, price: 90, category: "exclusive", image: "https://www.lookfantastic.ie/images?url=https://static.thcdn.com/productimg/original/13222864-2074898513714328.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover" },
        { id: 15, name: "Happy Days Skincare Set", oldPrice: 155, price: 75, category: "exclusive", image: "https://florencebymillsbeauty.com/cdn/shop/files/Untitled_design_36c9e428-9a6b-4260-aa3a-3b0930b9d70e_grande.jpg?v=1746721830" }
      ];

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    products = products.concat(storedProducts);

    const newProduct = JSON.parse(localStorage.getItem("newProduct"));
    if (newProduct) {
      products.push(newProduct);
      storedProducts.push(newProduct); 
      localStorage.setItem("products", JSON.stringify(storedProducts));
      localStorage.removeItem("newProduct");
      Swal.fire("Added!", `${newProduct.name} has been added to the products.`, "success");
    }
  
    const container = document.getElementById("productsContainer");
    const filterBtns = document.querySelectorAll(".product-filter-btn");
    let selectedCategory = "all";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const role = localStorage.getItem("role"); 
  
    function renderProducts(category = "all") {
      container.innerHTML = "";
      const filtered = category === "all" ? products : products.filter(p => p.category === category);
  
      filtered.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3 mb-4";
  
        let ribbonHTML = "";
        if (product.category === "exclusive") ribbonHTML = `<div class="product-ribbon">50% OFF</div>`;
        else if (product.category === "summer") ribbonHTML = `<div class="product-ribbon product-ribbon-summer">Limited Time</div>`;
  
        let removeBtnHTML = role === "admin" ? `<button class="btn btn-danger btn-sm product-remove-btn mt-2">Remove</button>` : "";
  
        col.innerHTML = `
          <div class="card product-card h-100 position-relative">
            ${ribbonHTML}
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body product-card-body text-center">
              <h5 class="card-title">${product.name}</h5>
              ${product.oldPrice ? `<p class="product-old-price">$${product.oldPrice}</p>` : ""}
              <p class="price">$${product.price}</p>
              <div class="product-quantity-control">
                <button class="product-decrease">-</button>
                <span class="product-quantity">1</span>
                <button class="product-increase">+</button>
              </div>
              <button class="btn product-btn-custom btn-sm product-add-btn">Add to Cart</button>
              ${removeBtnHTML}
            </div>
          </div>
        `;
  
        const qtySpan = col.querySelector(".product-quantity");
        let quantity = 1;
  
        col.querySelector(".product-increase").addEventListener("click", () => {
          quantity++;
          qtySpan.textContent = quantity;
        });
  
        col.querySelector(".product-decrease").addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            qtySpan.textContent = quantity;
          }
        });
  
        col.querySelector(".product-add-btn").addEventListener("click", () => {
          for (let i = 0; i < quantity; i++) cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire("Added!", `${quantity} × ${product.name} added to your cart.`, "success");
        });
  
        if (role === "admin") {
          col.querySelector(".product-remove-btn").addEventListener("click", () => {
            Swal.fire({
              title: `Are you sure?`,
              text: `Remove ${product.name} from the products list?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, remove',
              cancelButtonText: 'Cancel',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                const index = products.indexOf(product);
                if (index > -1) products.splice(index, 1);
                const storedIndex = storedProducts.findIndex(p => p.id === product.id);
                if (storedIndex > -1) storedProducts.splice(storedIndex, 1);
                localStorage.setItem("products", JSON.stringify(storedProducts));
                renderProducts(selectedCategory);
                Swal.fire("Removed!", `${product.name} has been removed.`, "success");
              }
            });
          });
        }
  
        container.appendChild(col);
      });
    }
  
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCategory = btn.dataset.category;
        renderProducts(selectedCategory);
      });
    });
  
    renderProducts(selectedCategory);
  });
  