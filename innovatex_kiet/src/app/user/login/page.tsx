"use client"; // Mark this component as a Client Component

import { useState } from 'react'; // Import useState to manage component state
import { useRouter } from 'next/navigation'; // Import useRouter for client-side routing
import { useDispatch } from 'react-redux'; // Redux hook to dispatch actions
import PrivateRoute from '@/components/privateRoute'; // Import the PrivateRoute component for protected routes
import { loginUser } from '@/lib/Redux/slices/userSlice'; // Import loginUser action from the user slice

// Define the Login component
export default function Login() {
  const router = useRouter(); // Create a router instance for navigation
  const dispatch = useDispatch(); // Create a dispatch instance to trigger Redux actions

  // Initialize state for form data, error messages, and loading status
  const [formData, setFormData] = useState({
    email: '', // Email input field
    password: '', // Password input field
  });
  const [error, setError] = useState<string | null>(null); // State for storing error messages
  const [loading, setLoading] = useState(false); // State for loading status during submission

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData, // Retain existing form data
      [name]: value, // Update the specific field with the new value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setError(null); // Clear any existing error messages

    try {
      // Make a POST request to the login API endpoint
      const res = await fetch('/api/users/login', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON string and send it in the request body
      });

      const data = await res.json(); // Parse the response data

      // Check if the response is not OK (indicates an error)
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong'); // Throw an error with the error message from the response or a default message
      }

      // Dispatch loginUser action to Redux store with email and username
      dispatch(loginUser({ email: formData.email}));

      // Alert success message and redirect to the homepage or dashboard
      alert('Logged in successfully');
      router.push('/user/feeds'); // Navigate to the feed page after successful login
    } catch (error: any) {
      setError(error.message); // Set the error state to the error message
    } finally {
      setLoading(false); // Set loading state to false after the request is complete
    }
  };

  // Render the component
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-100">
      {/* Container for the form */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1> {/* Form title */}

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if any */}

        {/* Form element */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email" // Input type is email
              name="email" // Name attribute for identification
              id="email" // ID for accessibility
              value={formData.email} // Bind input value to email state
              onChange={handleInputChange} // Call handleInputChange on input change
              required // Make this field mandatory
              className="mt-1 block w-full p-2 border border-gray-300 rounded" // Tailwind CSS classes for styling
            />
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password" // Input type is password
              name="password" // Name attribute for identification
              id="password" // ID for accessibility
              value={formData.password} // Bind input value to password state
              onChange={handleInputChange} // Call handleInputChange on input change
              required // Make this field mandatory
              className="mt-1 block w-full p-2 border border-gray-300 rounded" // Tailwind CSS classes for styling
            />
          </div>

          {/* Submit button */}
          <button
            type="submit" // Button type is submit
            disabled={loading} // Disable button when loading
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Tailwind CSS classes for styling
          >
            {loading ? 'Logging in...' : 'Login'} {/* Display loading message or login text */}
          </button>
        </form>

        {/* Link to signup page */}
        <p className="mt-4 text-center">
          Don't have an account? <a href="/user/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}
