const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Dummy user database
const users = [
    { email: "student@artspora.com", password: "password123" }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    res.json({ success: !!user });
});

// Courses page
app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/courses.html'));
});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});