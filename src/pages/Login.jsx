import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import room1 from "../assets/resort-1 (1).jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const { login }  = useAuth();
  const navigate   = useNavigate();

  // ── your original logic, untouched ──────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {                          // tiny delay for UX feel
      const result = login(username, password);
      setLoading(false);

      if (!result.success) {
        setError(result.message);
        return;
      }

      if (result.user.role === "admin") {
        navigate("/my-bookings");
        return;
      }

      navigate("/dashboard");
    }, 600);
  };
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen">

      {/* ── LEFT PANEL — hero image ───────────────────────────────────── */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        <img
          src={room1}
          alt="Resort"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-amber-900/40 to-black/60" />

        {/* content on top of image */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-amber-500 rounded-xl">
              <span className="text-lg font-black text-white">R</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Demo<span className="text-amber-400">Luxe</span>
            </span>
          </div>

          {/* centre quote */}
          <div>
            <div className="mb-4 font-serif text-5xl text-amber-400">"</div>
            <p className="max-w-sm text-2xl font-light leading-relaxed text-white">
              Every stay is crafted to be an{" "}
              <span className="font-semibold text-amber-400">unforgettable</span> story.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="guest"
                className="object-cover w-10 h-10 border-2 rounded-full border-amber-400"
              />
              <div>
                <p className="text-sm font-semibold text-white">Emily Richardson</p>
                <div className="flex gap-0.5 text-amber-400 text-xs">
                  {"★★★★★"}
                </div>
              </div>
            </div>
          </div>

          {/* bottom stats */}
          <div className="flex gap-6">
            {[
              { num: "500+", label: "Happy Guests" },
              { num: "4.9★", label: "Rating"       },
              { num: "24/7", label: "Concierge"    },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-black text-amber-400">{num}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ───────────────────────────────────────────── */}
      <div className="flex items-center justify-center flex-1 px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">

          {/* mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="flex items-center justify-center w-9 h-9 bg-amber-500 rounded-xl">
              <span className="font-black text-white">R</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900">
              Resort<span className="text-amber-500">Luxe</span>
            </span>
          </div>

          {/* heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to manage your bookings and explore our suites.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* username */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute text-base text-gray-400 -translate-y-1/2 select-none left-4 top-1/2">
                  👤
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold tracking-wider text-gray-600 uppercase">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute text-base text-gray-400 -translate-y-1/2 select-none left-4 top-1/2">
                  🔒
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute text-sm font-medium text-gray-400 transition-colors -translate-y-1/2 right-4 top-1/2 hover:text-gray-700"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* demo credentials hint */}
            <div className="px-4 py-3 border bg-amber-50 border-amber-200 rounded-xl">
              <p className="mb-1 text-xs font-bold text-amber-800">Demo Credentials</p>
              <div className="text-xs text-amber-700 space-y-0.5">
                <p>👤 User — <code className="px-1 rounded bg-amber-100">user</code> / <code className="px-1 rounded bg-amber-100">user123</code></p>
                <p>🔑 Admin — <code className="px-1 rounded bg-amber-100">admin</code> / <code className="px-1 rounded bg-amber-100">admin123</code></p>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm font-bold text-white transition-all shadow-lg bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 rounded-xl hover:shadow-amber-200 hover:shadow-xl active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In →"
              )}
            </button>

          </form>

          {/* footer note */}
          <p className="mt-8 text-xs text-center text-gray-400">
            By signing in you agree to our{" "}
            <span className="cursor-pointer text-amber-600 hover:underline">Terms of Service</span>{" "}
            and{" "}
            <span className="cursor-pointer text-amber-600 hover:underline">Privacy Policy</span>.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;