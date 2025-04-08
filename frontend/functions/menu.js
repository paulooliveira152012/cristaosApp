import { getBaseApi } from "utils/getBaseApi";
const baseApi = getBaseApi()

export const handleLogin = async (email, password, login) => {
    console.log("Logging in with:", email, password);

    
    // const api = "http://localhost:5001/api/auth/login";
    const api = `${baseApi}/api/auth/login`


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
            if (data) {  // ✅ Ensure response contains user data
                login(data); // ✅ Store user in context & navigate
                console.log("User logged in successfully:", data.user);
            } else {
                console.error("❌ Login failed: User data missing from response");
            }

            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message || "Login failed" };
        }
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Network error" };
    }
};




export const handleSignup = async (
    email, 
    password, 
    username, 
    firstName, 
    lastName, 
    phoneNumber, 
    church, 
    ministry,
    twitterHandle, 
    instagramHandle
    
) => {
    console.log("🟢 frontend: signup function");
    
    if (!email || !password || !username || !firstName || !lastName) {
        console.log("❌ All required fields must be provided");
        return { success: false, message: "All required fields must be filled." };
    }

    // const api = "http://localhost:5001/api/auth/signup";
    const api = `${baseApi}/api/auth/signup`

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, 
                password, 
                username,
                firstName,
                lastName,
                phoneNumber,
                church,
                ministry,
                twitterHandle, 
                instagramHandle
            })
        });

        const data = await response.json(); // ✅ Parse response JSON
        console.log("🟢 Signup API response:", data);

        if (response.ok) {
            console.log("✅ User created successfully!");
            return data;
        } else {
            console.log("❌ Signup failed:", data.message);
            return { success: false, message: data.message || "Signup failed" };
        }

    } catch (error) {
        console.error("❌ Signup Error:", error);
        return { success: false, message: "Network error. Please try again later." };
    }
};