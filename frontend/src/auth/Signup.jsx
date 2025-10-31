import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      // create account
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
        { withCredentials: true } 
      );

      setSuccess("Signup successful! Logging you in...");
      console.log("User created:", res.data);

      // ✅ Automatically login: cookie is already set, so just redirect
      setTimeout(() => {
        navigate("/dashboard"); // or "/" if that’s your dashboard route
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 text-green-400 p-2 rounded mb-3 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold py-2 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-slate-400 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}
