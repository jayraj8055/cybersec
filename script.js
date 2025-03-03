document.addEventListener("DOMContentLoaded", () => {
  // 🔹 LOGIN FUNCTIONALITY
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          const response = await fetch("https://your-render-url.onrender.com/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password })
          });

          const data = await response.json();
          if (data.success) {
              localStorage.setItem("user", JSON.stringify({ username }));
              window.location.href = "main.html"; // Redirect to main page
          } else {
              document.getElementById("error-message").textContent = "Invalid username or password!";
              document.getElementById("error-message").style.display = "block";
          }
      });
  }

  // 🔹 SIGNUP FUNCTIONALITY
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const username = document.getElementById("new-username").value;
          const password = document.getElementById("new-password").value;

          const response = await fetch("https://your-render-url.onrender.com/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password })
          });

          const data = await response.json();
          if (data.success) {
              alert("Signup successful! Please login.");
              window.location.href = "index.html"; // Redirect to login
          } else {
              document.getElementById("signup-error-message").textContent = "User already exists!";
              document.getElementById("signup-error-message").style.display = "block";
          }
      });
  }

  // 🔹 PASSWORD VISIBILITY TOGGLE
  document.getElementById("toggle-login-password")?.addEventListener("click", () => {
      togglePasswordVisibility("password");
  });
  document.getElementById("toggle-signup-password")?.addEventListener("click", () => {
      togglePasswordVisibility("new-password");
  });

  function togglePasswordVisibility(inputId) {
      const passwordField = document.getElementById(inputId);
      passwordField.type = passwordField.type === "password" ? "text" : "password";
  }
});
// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  const isDarkMode = document.body.classList.contains('light-mode') ? false : true;
  darkModeToggle.textContent = isDarkMode ? '🌙' : '☀️';

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isNowLightMode = document.body.classList.contains('light-mode');
    darkModeToggle.textContent = isNowLightMode ? '☀️' : '🌙';
    localStorage.setItem('lightMode', isNowLightMode);
  });

  const savedLightMode = localStorage.getItem('lightMode') === 'true';
  if (savedLightMode) {
    document.body.classList.add('light-mode');
    darkModeToggle.textContent = '☀️';
  }
}

// Toggle Password Visibility for Login and Signup
const toggleLoginPasswordBtn = document.getElementById('toggle-login-password');
const loginPasswordInput = document.getElementById('password');
const toggleSignupPasswordBtn = document.getElementById('toggle-signup-password');
const signupPasswordInput = document.getElementById('new-password');

if (toggleLoginPasswordBtn && loginPasswordInput) {
  let isLoginPasswordVisible = false;

  toggleLoginPasswordBtn.addEventListener('click', () => {
    if (isLoginPasswordVisible) {
      loginPasswordInput.type = 'password';
      toggleLoginPasswordBtn.textContent = 'Show Password';
    } else {
      loginPasswordInput.type = 'text';
      toggleLoginPasswordBtn.textContent = 'Hide Password';
    }
    isLoginPasswordVisible = !isLoginPasswordVisible;
  });
}

if (toggleSignupPasswordBtn && signupPasswordInput) {
  let isSignupPasswordVisible = false;

  toggleSignupPasswordBtn.addEventListener('click', () => {
    if (isSignupPasswordVisible) {
      signupPasswordInput.type = 'password';
      toggleSignupPasswordBtn.textContent = 'Show Password';
    } else {
      signupPasswordInput.type = 'text';
      toggleSignupPasswordBtn.textContent = 'Hide Password';
    }
    isSignupPasswordVisible = !isSignupPasswordVisible;
  });
}