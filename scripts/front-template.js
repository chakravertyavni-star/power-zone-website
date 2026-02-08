const glassData = [
  {
    text: "Trainers",
    icon: "fa-user",
    rotate: -15,
    link: "templates/trainers.html"
  },
  {
    text: "Membership",
    icon: "fa-id-card",
    rotate: 5,
    link: "templates/membership.html"
  },
  {
    text: "Nutritionist",
    icon: "fa-apple-whole",
    rotate: 25,
    link: "templates/nutritionist.html"
  }
];




const container = document.getElementById("glassContainer");

glassData.forEach(item => {
  const card = document.createElement("div");
  card.className = "glass";
  card.style.setProperty("--r", item.rotate);
  card.setAttribute("data-text", item.text);

  card.innerHTML = `
    <i class="fa-solid ${item.icon}"></i>
  `;

  // 🔴 THIS PART IS CRITICAL
  card.addEventListener("click", () => {
    window.location.href = item.link;
  });

  container.appendChild(card);
});
