const GITHUB_USER = "CloudDown";
const FEATURED = new Set([
  "dispo",
  "quest",
  "vif",
  "annie",
  "instree",
  "portfolio",
  "clouddown",
]);
const HIDDEN = new Set([
  "mirage",
  "alcoil",
  "pilepsy",
  "doxbaveurs",
  "king",
  "macrogamepass",
  "duckyDoubleusb",
  "duckydoubleusb",
  "webfront-duplication-04708",
  "script_mcp_build",
  "clash",
  "pro_cursor",
]);

function toggleTheme() {
  const body = document.body;
  const themeButton = document.querySelector(".theme-toggle");
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    themeButton.textContent = "Thème sombre";
  } else {
    body.classList.add("dark-theme");
    themeButton.textContent = "Thème clair";
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function repoCard(repo) {
  const description =
    repo.description || "Dépôt public — voir le README sur GitHub.";
  const language = repo.language ? escapeHtml(repo.language) : "Divers";
  const stars = repo.stargazers_count
    ? `<span class="project-stars" title="Étoiles"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>`
    : "";
  const homepage = repo.homepage
    ? `<a href="${escapeHtml(repo.homepage)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Site</a>`
    : "";

  return `
    <article class="project-card github-card">
      <div class="project-meta">
        <span class="project-lang">${language}</span>
        ${stars}
      </div>
      <h3>${escapeHtml(repo.name)}</h3>
      <p>${escapeHtml(description)}</p>
      <div class="project-links">
        <a href="${escapeHtml(repo.html_url)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>
        ${homepage}
      </div>
    </article>
  `;
}

async function loadGitHubRepos() {
  const grid = document.getElementById("github-repos");
  const loading = document.getElementById("github-loading");
  const errorEl = document.getElementById("github-error");
  const stats = document.getElementById("github-stats");

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}`);
    }

    const repos = await response.json();
    const visible = repos
      .filter((repo) => !repo.fork && !HIDDEN.has(repo.name.toLowerCase()))
      .filter((repo) => !FEATURED.has(repo.name.toLowerCase()))
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });

    const publicCount = repos.filter((r) => !r.fork).length;
    const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const langs = new Set(
      repos.filter((r) => r.language).map((r) => r.language)
    );

    document.getElementById("stat-repos").textContent = String(publicCount);
    document.getElementById("stat-stars").textContent = String(stars);
    document.getElementById("stat-langs").textContent = String(langs.size);
    stats.hidden = false;

    if (loading) loading.remove();

    if (visible.length === 0) {
      grid.innerHTML =
        '<p class="loading-msg">Tous les dépôts publics sont déjà listés en projets phares.</p>';
      return;
    }

    grid.innerHTML = visible.map(repoCard).join("");
  } catch (err) {
    if (loading) loading.remove();
    errorEl.hidden = false;
    errorEl.innerHTML = `Impossible de charger les dépôts pour le moment.
      <a href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" rel="noopener noreferrer">Ouvrir GitHub</a>.`;
    console.error(err);
  }
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Portfolio — message de ${name}`);
    const body = encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\n\n${message}`
    );
    window.location.href = `mailto:maxime.lauber@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
setupContactForm();
loadGitHubRepos();
