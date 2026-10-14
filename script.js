function toggleTheme() {
  const dark = document.body.classList.toggle("dark-theme");
  document.querySelector(".theme-toggle").textContent = dark ? "Light" : "Dark";
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Portfolio — message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:maxime.lauber@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.getElementById("year").textContent = String(new Date().getFullYear());
setupContactForm();
