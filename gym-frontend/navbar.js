const navbarHTML = `
<nav class="navbar">
  <div class="nav-left">
    <div class="logo">
      <a href="../index.html">Power Zone</a>
    </div>
  </div>

  <!-- HAMBURGER -->
  <div class="hamburger" id="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <!-- NAV LINKS -->
  <ul class="nav-links" id="navLinks">
  
    <li><a href="../index.html">Home</a></li>
    <li><a href="amenities.html">Amenities</a></li>
    <li><a href="contact.html">Contact</a></li>

    <li id="servicesNav" class="hidden">
      <a href="services.html" >Services</a>
    </li>

    <li id="loginNav">
      <a href="login.html">Login</a>
    </li>

    <li id="logoutNav" class="hidden">
      <a href="#">Logout</a>
    </li>
  </ul>
</nav>
`;


document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return; // 🔑 important

  // 1️⃣ Inject navbar FIRST
  navbarContainer.innerHTML = navbarHTML;

  // 2️⃣ Cache elements AFTER injection
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const logoutNav = document.getElementById("logoutNav");

  // 3️⃣ Attach listeners
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  logoutNav.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    updateNavbar();
    navLinks.classList.remove("active");
    window.location.href = "index.html";
  });
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navLinks").classList.remove("active");
    });
  });

  // 4️⃣ NOW update navbar state
  updateNavbar();
});

function updateNavbar() {
  const servicesNav = document.getElementById("servicesNav");
  const loginNav = document.getElementById("loginNav");
  const logoutNav = document.getElementById("logoutNav");

  if (!servicesNav || !loginNav || !logoutNav) {
    console.warn("Navbar items not found");
    return;
  }

  const token = localStorage.getItem("token");

  if (token) {
    servicesNav.classList.remove("hidden");
    logoutNav.classList.remove("hidden");
    loginNav.classList.add("hidden");
  } else {
    servicesNav.classList.add("hidden");
    logoutNav.classList.add("hidden");
    loginNav.classList.remove("hidden");
  }
}


