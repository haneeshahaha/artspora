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

// Signup Form
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const res = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Account created successfully! You can now log in.");
            document.getElementById("showLogin").click(); // Switch to login form
        } else {
            alert(data.message || "Signup failed.");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("Error connecting to server. Try again later.");
    }
});

// Login Form
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = "/courses";
        } else {
            alert(result.message || "Login failed.");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Error connecting to server. Try again later.");
    }
});
