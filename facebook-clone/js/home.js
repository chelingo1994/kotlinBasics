document.addEventListener("DOMContentLoaded", () => {
  const user = requireAuth();
  if (!user) return;

  document.getElementById("userName").textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById("avatar").textContent = user.firstName.charAt(0).toUpperCase();

  document.getElementById("logoutBtn").addEventListener("click", () => {
    logout();
    window.location.href = "index.html";
  });

  const postText = document.getElementById("postText");
  const postBtn = document.getElementById("postBtn");
  const postsList = document.getElementById("postsList");
  const emptyState = document.getElementById("emptyState");

  postText.addEventListener("input", () => {
    postBtn.disabled = postText.value.trim().length === 0;
  });

  function timeAgo(timestamp) {
    const diffMs = Date.now() - timestamp;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "justo ahora";
    if (diffMin < 60) return `hace ${diffMin} min`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `hace ${diffHrs} h`;
    return new Date(timestamp).toLocaleDateString();
  }

  function render() {
    const posts = getPosts().sort((a, b) => b.timestamp - a.timestamp);
    postsList.innerHTML = "";
    emptyState.style.display = posts.length === 0 ? "block" : "none";

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <div class="post-header">
          <div class="avatar">${post.authorName.charAt(0).toUpperCase()}</div>
          <div>
            <div class="post-author">${escapeHtml(post.authorName)}</div>
            <div class="post-time">${timeAgo(post.timestamp)}</div>
          </div>
        </div>
        <div class="post-text">${escapeHtml(post.text)}</div>
        ${post.authorEmail === user.email ? `<button class="btn-delete" data-id="${post.id}">Eliminar</button>` : ""}
      `;
      postsList.appendChild(div);
    });

    postsList.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const remaining = getPosts().filter(p => String(p.id) !== id);
        savePosts(remaining);
        render();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  postBtn.addEventListener("click", () => {
    const text = postText.value.trim();
    if (!text) return;
    const posts = getPosts();
    posts.push({
      id: Date.now(),
      authorName: `${user.firstName} ${user.lastName}`,
      authorEmail: user.email,
      text,
      timestamp: Date.now(),
    });
    savePosts(posts);
    postText.value = "";
    postBtn.disabled = true;
    render();
  });

  render();
});
