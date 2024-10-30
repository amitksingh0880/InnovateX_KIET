"use client"; // Mark the component as a Client Component

import { useState } from "react"; // Import the useState hook
import { useRouter } from "next/navigation"; // Import router for navigation
import PrivateRoute from "@/components/privateRoute";
import { useDispatch } from "react-redux";

export default function Signup() {
    const router = useRouter();
    const dispatch = useDispatch();

    // States for form data, errors, loading, token verification
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
        dept: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false); // Whether the user is verifying email
    const [userId, setUserId] = useState(""); // Store userId for verification
    const [token, setToken] = useState(""); // Store the verification token
    const [name, setUsernameState] = useState("");

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setUsernameState(e.target.name)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result as string, // Store the base64 encoded image
                }));
            };
            reader.readAsDataURL(file); // Read the file as base64
        }
    };

    // Handle form submission for user registration
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // dispatch(setUsername(name));
        setLoading(true);
        setError(null);

        try {
            // Send signup data to the API
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send formData including username
            });

            const data = await res.json();

            // If user already exists, redirect to login page
            if (data.error === "User already exists") {
                alert("User already exists. Redirecting to login...");
                router.push("/user/login");
            }

            // If user is registered but needs email verification
            if (data.success && !data.savedUser.isVerified) {
                alert("User registered successfully! Please verify your email.");
                setUserId(data.savedUser._id); // Store userId for future use
                setIsVerifying(true); // Prompt for email verification
            }
        } catch (error: any) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Handle email verification after token input
    const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Send the token to the API to verify email
            const res = await fetch("/api/users/verifyemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Email Verified Successfully!");
                router.push("/user/login"); // Redirect to login after successful verification
            } else {
                throw new Error(data.error || "Invalid Token");
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // If user is in the verification stage, show the token input
    if (isVerifying) {
        return (
            <div className="flex items-center justify-center bg-gray-100">
                <div className="bg-white rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold  text-center">Verify Your Email</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleVerifyEmail}>
                        <div className="mb-4">
                            <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                                Enter Verification Token
                            </label>
                            <input
                                type="text"
                                name="token"
                                id="token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter the token sent to your email"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // If not verifying, show the signup form
    return (
        <div className="flex items-center justify-center rounded-full bg-gray-100">
            {/* <h1>Hello</h1> */}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {/* <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleFileChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select
                            name="dept"
                            id="dept"
                            value={formData.dept}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Department</option>
                            <option value="MCA">MCA</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                    <p className="mt-4 text-center">
                        Already have an account? <a href="/user/login" className="text-blue-500">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
