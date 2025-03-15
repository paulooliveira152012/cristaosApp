export const handleLogin = async (email, password) => {
    console.log("Logging in with:", email, password);

    const api = "http://localhost:5001/api/auth/login";

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("Server response:", data);

        if (response.ok) {
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message || "Login failed" };
        }
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Network error" };
    }
};



export const handleSignup = async (email, password, username) => {
    console.log("frontend: signup function")
    if (!email || !password) {
        console.log("Email and password are required");
        return;
    }

    const api = "http://localhost:5001/api/auth/signup";

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, username })
        })
        if (response.ok) {
            return {success: true, message: data.message}
        } else {
            return {success: false, message: data.message || "Signup failed"}
        }
        
    } catch (error) {
        console.error("Signup Error:", error);
        return { success: false, message: "Network error" };
    }
};


