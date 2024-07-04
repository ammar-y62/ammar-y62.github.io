document.addEventListener("DOMContentLoaded", function() {
    const isComponentPage = window.location.pathname.includes("components");
    const headerPath = isComponentPage ? "../../components/header/header.html" : "components/header/header.html";
    const footerPath = isComponentPage ? "../../components/footer/footer.html" : "components/footer/footer.html";

    loadComponent("header", headerPath);
    loadComponent("footer", footerPath);

    // Load theme from local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.toggle("light-mode", savedTheme === "light");
    }
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (id === "header") {
                addEventListeners();
                updateThemeSwitchState(); // Ensure theme switch state is updated
            }
        });
}

function addEventListeners() {
    document.querySelector(".theme-switch__checkbox").addEventListener("change", toggleTheme);
}

function toggleTheme() {
    const isLightMode = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
}

function updateThemeSwitchState() {
    const savedTheme = localStorage.getItem("theme");
    document.querySelector(".theme-switch__checkbox").checked = savedTheme === "light";
}

document.querySelector('.outer').addEventListener('mousemove', (e) => {
    const card = document.querySelector('.card');
    const { offsetWidth: width, offsetHeight: height } = card;
    const { offsetX: x, offsetY: y } = e;

    const rotateY = (x / width - 0.5) * 30;
    const rotateX = (y / height - 0.5) * -30;

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

document.querySelector('.outer').addEventListener('mouseleave', () => {
    const card = document.querySelector('.card');
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
