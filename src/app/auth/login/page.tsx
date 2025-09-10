"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Wrench, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const wrenchAnimation = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.2, 1], y: [0, -10, 0] },
  transition: {
    duration: 1.5,
    ease: "easeInOut" as const, // ✅ fixed typing issue
    repeat: Infinity,
    repeatDelay: 4,
  },
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/tire.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-6 z-20">
        <div className="flex items-center space-x-2">
          <Wrench className="w-8 h-8 text-white" />
          <span className="text-white font-extrabold text-xl">Handyman</span>
        </div>
      </nav>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-gradient-to-br from-white/20 to-white/10 
        backdrop-blur-2xl border border-white/30 p-10 rounded-2xl shadow-2xl 
        text-center max-w-md w-full mx-4"
      >
        {/* Title */}
        <motion.h1 className="text-3xl font-extrabold text-white mb-6 flex flex-col items-center space-y-3">
          <motion.div
            initial="initial"
            animate="animate"
            transition={wrenchAnimation.transition}
            variants={{
              initial: wrenchAnimation.initial,
              animate: wrenchAnimation.animate,
            }}
          >
            <Wrench className="w-20 h-20 text-white drop-shadow-lg" />
          </motion.div>
          <span>Login</span>
        </motion.h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-500/80 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
          </button>
        </form>

        {error && <p className="text-red-400 mt-3">{error}</p>}
        {success && (
          <div className="flex items-center justify-center gap-2 text-green-400 mt-3 font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            Login successful! Redirecting...
          </div>
        )}

        <p className="text-gray-200 mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-300 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
