// Todo funciona 100% en el navegador con localStorage. No se envían datos a ningún servidor.
const USERS_KEY = "fb_clone_users";
const SESSION_KEY = "fb_clone_session";
const POSTS_KEY = "fb_clone_posts";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

function registerUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

function login(email, password) {
  const user = findUserByEmail(email);
  if (!user) {
    return { ok: false, reason: "no-account" };
  }
  if (user.password !== password) {
    return { ok: false, reason: "wrong-password" };
  }
  localStorage.setItem(SESSION_KEY, email.toLowerCase());
  return { ok: true, user };
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return findUserByEmail(email) || null;
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
  }
  return user;
}

function getPosts() {
  return JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
}

function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}
