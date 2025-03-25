const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const users = []; // Temporary in-memory user store

// Test Route - Check if the server is running
app.get('/', (req, res) => {
    res.send('✅ Server is running!');
});

// Registration Route - Hash password before storing
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store user
    users.push({ email, password: hashedPassword });
    
    res.json({ success: true, message: "User registered!" });
});

// Login Route - Compare hashed passwords
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) return res.json({ success: false, message: "User not found!" });
    
    // Compare password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials!" });
    
    res.json({ success: true, message: "Login successful!" });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
