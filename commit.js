const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const setupOverlay = document.getElementById("setupOverlay");
const nameInput = document.getElementById("nameInput");
const avatarInput = document.getElementById("avatarInput");
const setupButton = document.getElementById("setupButton");

let user = {
    name: localStorage.getItem("name") || "",
    avatar: localStorage.getItem("avatar") || ""
};

// Проверка, нужна ли настройка профиля
if (!user.name) {
    setupOverlay.style.display = "flex";
} else {
    setupOverlay.style.display = "none";
}

// Сохранение данных пользователя в localStorage
function saveUserData() {
    localStorage.setItem("name", user.name);
    localStorage.setItem("avatar", user.avatar);
}

// Завершение настройки профиля
setupButton.addEventListener("click", () => {
    user.name = nameInput.value;
    if (avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            user.avatar = reader.result;
            saveUserData(); // Сохраняем данные после загрузки аватара
            setupOverlay.style.display = "none";
        };
        reader.readAsDataURL(avatarInput.files[0]);
    } else {
        saveUserData(); // Сохраняем данные без аватара
        setupOverlay.style.display = "none";
    }
});

// Отправка сообщения
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (messageInput.value.trim() !== "") {
        const messageText = messageInput.value;
        const messageTime = Date.now();
        sendMessage(messageText, false, messageTime);
        saveMessage(messageText, false, messageTime);
        messageInput.value = "";
    }
});

// Позволить отправку сообщений с помощью клавиши Enter
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Предотвращаем добавление новой строки
        messageForm.dispatchEvent(new Event("submit"));
    }
});

// Загрузка сообщений из localStorage
function loadMessages() {
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    savedMessages.forEach(msg => {
        sendMessage(msg.text, msg.isReceived, msg.time);
    });
}

// Форматирование времени (часы и минуты)
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Отправка текста сообщения
function sendMessage(text, isReceived = false, time = Date.now()) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", isReceived ? "received" : "sent");
    messageEl.setAttribute("data-time", time);

    const avatarEl = document.createElement("img");
    avatarEl.classList.add("avatar");
    avatarEl.src = isReceived ? "other-user-avatar.png" : user.avatar || "default-avatar.png";

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.textContent = text;

    // Добавляем время в сообщение
    const timeEl = document.createElement("span");
    timeEl.classList.add("time");
    timeEl.textContent = formatTime(time);

    const messageMeta = document.createElement("div");
    messageMeta.classList.add("message-meta");
    messageMeta.appendChild(timeEl);

    messageEl.appendChild(avatarEl);
    messageEl.appendChild(messageContent);
    messageEl.appendChild(messageMeta);
    messages.appendChild(messageEl);

    // Прокрутка чата вниз после добавления нового сообщения
    messages.scrollTop = messages.scrollHeight;
}

// Сохранение сообщений в localStorage
function saveMessage(text, isReceived, time) {
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    savedMessages.push({ text, isReceived, time });
    localStorage.setItem("messages", JSON.stringify(savedMessages));
}

// Очистка сообщений старше 2 недель
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
setInterval(() => {
    const now = Date.now();
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    const filteredMessages = savedMessages.filter(msg => now - msg.time <= TWO_WEEKS_MS);
    localStorage.setItem("messages", JSON.stringify(filteredMessages));
}, 60 * 60 * 1000);

// Загрузка сообщений при загрузке страницы
window.onload = loadMessages;
const themeToggleButton = document.getElementById('themeToggleButton');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme);

    // Set icon based on saved theme
    themeIcon.classList.toggle('fi-moon', savedTheme === 'light-theme');
    themeIcon.classList.toggle('fi-sun', savedTheme === 'dark-theme');
}

// Toggle between light and dark theme
themeToggleButton.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme', !isDarkMode);

    // Change icon based on theme
    themeIcon.classList.toggle('fi-moon', !isDarkMode);
    themeIcon.classList.toggle('fi-sun', isDarkMode);

    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark-theme' : 'light-theme');
});