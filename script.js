const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=";
const ambiguousChars = "/{}[]()~`\\";

const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

function generatePassword() {
  const includeUpper = document.getElementById('uppercase').checked;
  const includeLower = document.getElementById('lowercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSymbols = document.getElementById('symbols').checked;
  const excludeAmbiguous = document.getElementById('exclude-ambiguous').checked;

  let allowedChars = "";

  if (includeUpper) allowedChars += uppercaseChars;
  if (includeLower) allowedChars += lowercaseChars;
  if (includeNumbers) allowedChars += numberChars;
  
  if (includeSymbols) {
    if (excludeAmbiguous) {
      allowedChars += symbolChars;
    } else {
      allowedChars += symbolChars + ambiguousChars;
    }
  }

  if (allowedChars === "") {
    alert("Selecione pelo menos uma opção de caractere!");
    return;
  }

  const length = parseInt(lengthInput.value);
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  passwordInput.value = password;
  updateStrengthMeter(password, length);
}

function updateStrengthMeter(password, length) {
  const indicator = document.getElementById('strength-indicator');
  const text = document.getElementById('strength-text');
  
  let score = 0;
  if (length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    indicator.style.background = "#ef4444";
    text.textContent = "Fraca";
  } else if (score <= 4) {
    indicator.style.background = "#f59e0b";
    text.textContent = "Média";
  } else {
    indicator.style.background = "#22c55e";
    text.textContent = "Forte";
  }
}

copyBtn.addEventListener('click', () => {
  if (!passwordInput.value) return;
  
  navigator.clipboard.writeText(passwordInput.value);
  const originalText = copyBtn.textContent;
  copyBtn.textContent = "Copiado!";
  setTimeout(() => {
    copyBtn.textContent = originalText;
  }, 2000);
});

generateBtn.addEventListener('click', generatePassword);

// Gerar uma senha automaticamente ao carregar
generatePassword();