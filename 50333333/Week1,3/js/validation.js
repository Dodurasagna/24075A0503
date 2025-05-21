function validateRegister() {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPass").value.trim();
  
    if (name.length < 3) {
      alert("Name must be at least 3 characters.");
      return false;
    }
  
    if (!email.includes("@")) {
      alert("Enter a valid email.");
      return false;
    }
  
    if (pass.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }
  
    // ✅ Store user in localStorage
    const user = { name, email, password: pass };
    localStorage.setItem("user", JSON.stringify(user));
  
    alert("Registration successful!");
    // Redirect to login page
    window.location.href = "./login.html";
    return false;
  }
  function validateLogin() {
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value.trim();
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (!storedUser) {
      alert("No registered user found. Please register first.");
      return false;
    }
  
    if (email !== storedUser.email || pass !== storedUser.password) {
      alert("Invalid email or password.");
      return false;
    }
  
    alert("Login successful!");
    window.location.href = "catalog.html";
    return false;
  }
    