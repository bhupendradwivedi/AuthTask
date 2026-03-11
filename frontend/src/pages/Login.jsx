import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogin } from "../queries/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending, error } = useLogin();

  // Parse URL parameters for verification status
  const queryParams = new URLSearchParams(location.search);
  const isVerified = queryParams.get("verified");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token); // Store JWT [cite: 69]
          navigate("/profile"); // Redirect to protected route [cite: 15, 132]
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-[350px] space-y-5">
        <h2 className="text-2xl font-semibold text-center text-black">Login</h2>

        {/* Show success message if redirected from email  */}
        {isVerified === "true" && (
          <p className="text-green-600 text-sm text-center bg-green-50 p-2 rounded">
            Email verified! You can now login.
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error.response?.data?.message || "Login failed"}
          </p>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded-md disabled:bg-gray-400"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;