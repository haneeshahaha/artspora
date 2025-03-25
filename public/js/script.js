// Constants
const API_BASE_URL = 'http://localhost:5001';
const TOKEN_KEY = 'artspora_token';

// Form Toggles - unchanged (works well)
document.getElementById("showLogin").addEventListener("click", () => {
    document.getElementById("loginFormContainer").classList.remove("hidden");
    document.getElementById("signupFormContainer").classList.add("hidden");
    document.getElementById("showLogin").classList.add("active");
    document.getElementById("showSignup").classList.remove("active");
});

document.getElementById("showSignup").addEventListener("click", () => {
    document.getElementById("signupFormContainer").classList.remove("hidden");
    document.getElementById("loginFormContainer").classList.add("hidden");
    document.getElementById("showSignup").classList.add("active");
    document.getElementById("showLogin").classList.remove("active");
});

// Enhanced Registration
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    // Enhanced validation
    if (!email || !password) {
        showAlert("Please enter both email and password.");
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address.");
        return;
    }
    
    if (!isStrongPassword(password)) {
        showAlert("Password must be at least 8 characters with one number and one special character.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: getJsonHeaders(),
            body: JSON.stringify({ email, password }),
        });

        const data = await handleResponse(response);

        showAlert("Account created successfully! You can now log in.", 'success');
        document.getElementById("showLogin").click();
        clearForm('signupForm');
        
    } catch (error) {
        console.error("Signup Error:", error);
        showAlert(error.message || "Registration failed. Please try again.");
    }
});

// Enhanced Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        showAlert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: getJsonHeaders(),
            body: JSON.stringify({ email, password }),
        });

        const result = await handleResponse(response);

        localStorage.setItem(TOKEN_KEY, result.token);
        redirectToCourses(result.redirectUrl);
        
    } catch (error) {
        console.error("Login Error:", error);
        showAlert(error.message || "Login failed. Please check your credentials and try again.");
    }
});

// Helper Functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*]/.test(password);
}

function getJsonHeaders() {
    return { 
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
}

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
}

function showAlert(message, type = 'error') {
    // Replace with your preferred notification system
    alert(message);
    // Could use Toast notifications instead: Toastify({ text: message }).showToast();
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}

function redirectToCourses(redirectUrl) {
    // Ensure consistent .html extension
    window.location.href = redirectUrl 
        ? redirectUrl.endsWith('.html') 
            ? redirectUrl 
            : `${redirectUrl}.html`
        : "/courses.html";
}