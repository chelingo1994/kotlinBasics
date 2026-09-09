document.addEventListener("DOMContentLoaded", () => {
  // Si ya hay sesión activa, ir directo al feed.
  if (getCurrentUser()) {
    window.location.href = "home.html";
    return;
  }

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const emailField = document.getElementById("emailField");
  const passField = document.getElementById("passField");
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");
  const formMsg = document.getElementById("formMsg");

  function clearErrors() {
    emailField.classList.remove("has-error");
    passField.classList.remove("has-error");
    formMsg.style.display = "none";
  }

  function showFieldError(field, errorEl, text) {
    field.classList.add("has-error");
    errorEl.textContent = text;
  }

  function showFormMsg(text) {
    formMsg.textContent = text;
    formMsg.className = "form-msg error";
    formMsg.style.display = "block";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passInput.value;

    let hasError = false;
    if (!email) {
      showFieldError(emailField, emailError, "Por favor, introduce tu correo electrónico.");
      hasError = true;
    }
    if (!password) {
      showFieldError(passField, passError, "Por favor, introduce tu contraseña.");
      hasError = true;
    }
    if (hasError) return;

    const result = login(email, password);
    if (!result.ok) {
      if (result.reason === "no-account") {
        showFormMsg("No hemos encontrado ninguna cuenta con ese correo electrónico.");
      } else {
        showFieldError(passField, passError, "La contraseña que has introducido es incorrecta.");
      }
      return;
    }

    window.location.href = "home.html";
  });

  document.getElementById("goRegister").addEventListener("click", () => {
    window.location.href = "register.html";
  });

  document.getElementById("forgotLink").addEventListener("click", (e) => {
    e.preventDefault();
    showFormMsg("Esto es una demo local: no hay recuperación de contraseña por correo real.");
    formMsg.className = "form-msg error";
  });
});
