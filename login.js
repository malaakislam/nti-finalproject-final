
const accounts = [
    { email: "admin@naturelle.com", password: "Admin@123", role: "admin" },
    { email: "user@naturelle.com", password: "User@123", role: "user" }
  ];
  
 
  function toggleForms() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("formTitle");
  
    if (loginForm.style.display === "none") {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      formTitle.innerText = "Login";
    } else {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      formTitle.innerText = "Sign Up";
    }
  }
  
  
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.com$/;
    return regex.test(email);
  }
  
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
  
  
  document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
  
    if (!validateEmail(email)) {
      Swal.fire("Error", "Please enter a valid .com email.", "error");
      return;
    }
    if (!validatePassword(password)) {
      Swal.fire("Error", "Password must be 8+ chars, include upper, lower, number & special char.", "error");
      return;
    }
  
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
  
    Swal.fire("Success", "Sign up successful! You can now log in.", "success").then(() => {
      toggleForms();
    });
  });
 
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    const account = accounts.find(acc => acc.email === email && acc.password === password);
  
    
    if (account) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", account.role);
  
      Swal.fire("Welcome!", `Login successful as ${account.role}!`, "success").then(() => {
        if (account.role === "admin"||account.role === "user") {
          window.location.href = "home.html"; 
        } 
      });
  
    } else {
      Swal.fire("Error", "Invalid email or password.", "error");
    }
  });
  