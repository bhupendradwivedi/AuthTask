import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../queries/useRegister";

const Register = () => {
  const { mutate, isPending, isSuccess, error } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name, email, password }); // [cite: 40, 41, 42]
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[350px] space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-black">Register</h2>

        {isSuccess && (
          <p className="text-green-600 text-sm text-center bg-green-50 p-2 rounded">
            Registration successful! Please check your email to verify. {/* [cite: 46] */}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error.response?.data?.message || "Registration failed"}
          </p>
        )}

        <input
          type="text"
          required
          placeholder="Name"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password (min 6 chars)"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition disabled:bg-gray-400"
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;