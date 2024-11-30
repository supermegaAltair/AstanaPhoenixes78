const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Устанавливаем директорию для статичных файлов (без папки public)
app.use(express.static(path.join(__dirname)));

// Для обработки POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));

// Примерная база данных пользователей (массив)
let users = [];

// Эндпоинт для обработки регистрации
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Простая валидация
    if (!username || !email || !password) {
        return res.json({ success: false, message: 'Пожалуйста, заполните все поля.' });
    }

    // Проверка, есть ли уже такой пользователь
    if (users.some(user => user.email === email)) {
        return res.json({ success: false, message: 'Этот email уже зарегистрирован.' });
    }

    // Добавляем пользователя в базу данных
    users.push({ username, email, password });

    // Возвращаем успешный ответ
    res.json({ success: true });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});
