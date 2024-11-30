const themeToggleButton = document.getElementById('themeToggleButton');
const logo = document.getElementById('logo');
const body = document.body;

// Check the stored theme in localStorage when the page loads
window.onload = function () {
    const savedTheme = localStorage.getItem('theme'); // Get the theme from localStorage
    if (savedTheme) {
        body.classList.add(savedTheme); // Apply the saved theme
        if (savedTheme === 'dark-theme') {
            logo.src = 'logo2.png'; // Change logo to dark theme version
        } else {
            logo.src = 'logo.png'; // Keep the light theme logo
        }
    } else {
        body.classList.add('light-theme'); // Default to light theme if no saved theme
    }

    body.style.opacity = 1;
    body.style.transform = "scale(1)";
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.style.transform = 'translateY(0)';
};

// Toggle between light and dark theme when the button is clicked
themeToggleButton.addEventListener('click', () => {
    // Toggle between light and dark theme
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        logo.src = 'logo2.png'; // Change logo for dark theme
        localStorage.setItem('theme', 'dark-theme'); // Save the theme to localStorage
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        logo.src = 'logo.png'; // Change logo for light theme
        localStorage.setItem('theme', 'light-theme'); // Save the theme to localStorage
    }
});
// Toggle between light and dark theme when the button is clicked
themeToggleButton.addEventListener('click', () => {
    // Toggle between light and dark theme
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        logo.src = 'logo2.png'; // Change logo for dark theme
        localStorage.setItem('theme', 'dark-theme'); // Save the theme to localStorage

        // Send the theme to the server (e.g., to save it in the database)
        fetch('/save-theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme: 'dark-theme' }),
        });
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        logo.src = 'logo.png'; // Change logo for light theme
        localStorage.setItem('theme', 'light-theme'); // Save the theme to localStorage

        // Send the theme to the server (e.g., to save it in the database)
        fetch('/save-theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme: 'light-theme' }),
        });
    }
});
