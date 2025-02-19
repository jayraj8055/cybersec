// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  const isDarkMode = document.body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isNowDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isNowDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isNowDarkMode);
  });

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
}

// Simulated User Data for Login
const validUser = {
  username: "admin",
  password: "securepassword123"
};

// Handle Login Form Submission
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUser.username && password === validUser.password) {
      window.location.href = 'index.html';
    } else {
      errorMessage.style.display = 'block';
    }
  });
}

// Password Strength Checker
const passwordInput = document.getElementById('password-input');
const passwordStrength = document.getElementById('password-strength');
const generateStrongPasswordBtn = document.getElementById('generate-strong-password');
const togglePasswordVisibilityBtn = document.getElementById('toggle-password-visibility');

if (passwordInput && passwordStrength) {
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    passwordStrength.textContent = `Strength: ${strength}`;
  });

  let isPasswordVisible = false;

  generateStrongPasswordBtn.addEventListener('click', () => {
    const strongPassword = generateImprovedPassword(passwordInput.value);
    passwordInput.value = strongPassword;
    passwordStrength.textContent = 'Strength: Strong';
  });

  togglePasswordVisibilityBtn.addEventListener('click', () => {
    if (isPasswordVisible) {
      passwordInput.type = 'password';
      togglePasswordVisibilityBtn.textContent = 'Show Password';
    } else {
      passwordInput.type = 'text';
      togglePasswordVisibilityBtn.textContent = 'Hide Password';
    }
    isPasswordVisible = !isPasswordVisible;
  });
}

function checkPasswordStrength(password) {
  if (password.length < 6) return 'Weak';
  if (password.length < 10) return 'Moderate';
  return 'Strong';
}

function generateImprovedPassword(userPassword) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let newPassword = userPassword;

  if (!/[A-Z]/.test(newPassword)) newPassword += getRandomChar(uppercaseChars);
  if (!/[a-z]/.test(newPassword)) newPassword += getRandomChar(lowercaseChars);
  if (!/[0-9]/.test(newPassword)) newPassword += getRandomChar(numberChars);
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) newPassword += getRandomChar(symbolChars);

  while (newPassword.length < 12) {
    const charSet = uppercaseChars + lowercaseChars + numberChars + symbolChars;
    newPassword += getRandomChar(charSet);
  }

  return shuffleString(newPassword);
}

function getRandomChar(charSet) {
  return charSet.charAt(Math.floor(Math.random() * charSet.length));
}

function shuffleString(str) {
  let array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

// QR Code Generator
const qrInput = document.getElementById('qr-input');
const generateQrBtn = document.getElementById('generate-qr');
const qrCodeContainer = document.getElementById('qr-code-container');

if (qrInput && generateQrBtn && qrCodeContainer) {
  generateQrBtn.addEventListener('click', () => {
    const text = qrInput.value;
    if (!text) return alert('Please enter text or URL');
    qrCodeContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}" alt="QR Code">`;
  });
}

// Fetch News (Mock API Example)
const newsList = document.getElementById('news-list');
if (newsList) {
  fetch('https://api.example.com/cybersecurity-news') // Replace with real API
    .then(response => response.json())
    .then(data => {
      newsList.innerHTML = data.map(news => `<li>${news.title}</li>`).join('');
    })
    .catch(() => {
      newsList.innerHTML = '<li>Failed to load news.</li>';
    });
}