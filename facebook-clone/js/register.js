document.addEventListener("DOMContentLoaded", () => {
  if (getCurrentUser()) {
    window.location.href = "home.html";
    return;
  }

  const daySelect = document.getElementById("dobDay");
  const yearSelect = document.getElementById("dobYear");
  for (let d = 1; d <= 31; d++) {
    daySelect.insertAdjacentHTML("beforeend", `<option value="${d}">${d}</option>`);
  }
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= currentYear - 100; y--) {
    yearSelect.insertAdjacentHTML("beforeend", `<option value="${y}">${y}</option>`);
  }

  const form = document.getElementById("registerForm");
  const fields = {
    firstName: { input: document.getElementById("firstName"), field: document.getElementById("firstNameField"), error: document.getElementById("firstNameError") },
    lastName: { input: document.getElementById("lastName"), field: document.getElementById("lastNameField"), error: document.getElementById("lastNameError") },
    email: { input: document.getElementById("email"), field: document.getElementById("emailField"), error: document.getElementById("emailError") },
    password: { input: document.getElementById("password"), field: document.getElementById("passwordField"), error: document.getElementById("passwordError") },
  };
  const dobField = document.getElementById("dobField");
  const genderField = document.getElementById("genderField");
  const formMsg = document.getElementById("formMsg");

  function clearErrors() {
    Object.values(fields).forEach(f => f.field.classList.remove("has-error"));
    dobField.classList.remove("has-error");
    genderField.classList.remove("has-error");
    formMsg.style.display = "none";
  }

  function showFormMsg(text) {
    formMsg.textContent = text;
    formMsg.className = "form-msg error";
    formMsg.style.display = "block";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    if (!fields.firstName.input.value.trim()) {
      fields.firstName.field.classList.add("has-error");
      hasError = true;
    }
    if (!fields.lastName.input.value.trim()) {
      fields.lastName.field.classList.add("has-error");
      hasError = true;
    }
    const email = fields.email.input.value.trim();
    if (!isValidEmail(email)) {
      fields.email.field.classList.add("has-error");
      hasError = true;
    }
    const password = fields.password.input.value;
    if (password.length < 6) {
      fields.password.field.classList.add("has-error");
      hasError = true;
    }
    const gender = form.querySelector('input[name="gender"]:checked');
    if (!gender) {
      genderField.classList.add("has-error");
      hasError = true;
    }

    if (hasError) return;

    if (findUserByEmail(email)) {
      showFormMsg("Ya existe una cuenta registrada con este correo electrónico.");
      return;
    }

    const user = {
      firstName: fields.firstName.input.value.trim(),
      lastName: fields.lastName.input.value.trim(),
      email: email,
      password: password,
      dob: `${document.getElementById("dobDay").value}/${document.getElementById("dobMonth").value}/${document.getElementById("dobYear").value}`,
      gender: gender.value,
    };
    registerUser(user);
    login(email, password);
    window.location.href = "home.html";
  });
});
