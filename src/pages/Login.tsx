import React, {useState} from "react";
import {signIn} from "../lib/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            await signIn(email, password);
            window.location.href = "/admin";
        } catch (err : any) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
    <section className="min-h-screen flex items-center justify-center bg-[#060912]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#060912] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#060912] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Login;