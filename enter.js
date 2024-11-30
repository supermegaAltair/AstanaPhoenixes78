const themeToggleButton = document.getElementById('themeToggleButton');
const themeIcon = document.getElementById('themeIcon');
const logo = document.getElementById('logo');
const body = document.body;

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme);

    // Set icon and logo based on saved theme
    if (savedTheme === 'dark-theme') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        logo.src = 'logo2.png';
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        logo.src = 'logo.png';
    }
}

// Toggle between light and dark theme
themeToggleButton.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme', !isDarkMode);

    // Change icon and logo based on theme
    themeIcon.classList.toggle('fa-moon', !isDarkMode);
    themeIcon.classList.toggle('fa-sun', isDarkMode);
    logo.src = isDarkMode ? 'logo2.png' : 'logo.png';

    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark-theme' : 'light-theme');
});

// Fade-in and transform animation on load
window.onload = function () {
    body.style.opacity = 1;
    body.style.transform = "scale(1)";
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.style.transform = 'translateY(0)';
};