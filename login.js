// Select elements
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeModal = document.getElementById("closeModal");

// Show modal when login button clicked
loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close modal when X clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Form toggle
const loginFormContainer = document.getElementById("loginFormContainer");
const registerFormContainer = document.getElementById("registerFormContainer");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginFormContainer.style.display = "none";
  registerFormContainer.style.display = "block";
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerFormContainer.style.display = "none";
  loginFormContainer.style.display = "block";
});

// Prevent reload on submit
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login successful!");
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Registration successful!");
});
// ===== LOGIN SYSTEM USING LOCALSTORAGE =====

// Show modal
document.getElementById("loginBtn").addEventListener("click", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    logoutUser();
  } else {
    document.getElementById("loginModal").style.display = "block";
  }
});

// Close modal
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
});

// Switch between Login and Register forms
document.getElementById("showRegister").addEventListener("click", function () {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("registerFormContainer").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function () {
  document.getElementById("registerFormContainer").style.display = "none";
  document.getElementById("loginFormContainer").style.display = "block";
});

// Register form
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  // Store user data (simple demo, not secure)
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("userName", name);

  alert("Registration successful! Please log in now.");
  document.getElementById("registerFormContainer").style.display = "none";
  document.getElementById("loginFormContainer").style.display = "block";
});

// Login form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful!");
    document.getElementById("loginModal").style.display = "none";
    checkLoginStatus();
  } else {
    alert("Invalid credentials!");
  }
});

// Check login status on page load
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const name = localStorage.getItem("userName");

  if (isLoggedIn === "true") {
    document.getElementById("loginBtn").innerText = "Logout";
    document.getElementById("welcomeMsg").innerText = `Welcome, ${name || "User"} 👋`;
  } else {
    document.getElementById("loginBtn").innerText = "Login";
    document.getElementById("welcomeMsg").innerText = "";
  }
}

// Logout user
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  alert("You have been logged out!");
  checkLoginStatus();
}

// Run this when the page loads
window.onload = checkLoginStatus;
