"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { useState } from "react";
import supabase from "@/lib/supabaseClient"; // ✅ import your Supabase client
import { useRouter } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Bouncy spanner animation
const wrenchAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    y: [0, -10, 0],
  },
  transition: {
    duration: 1.5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 4,
  },
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // ✅ Redirect to dashboard after successful login
    router.push("/dashboard");
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
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 bg-gradient-to-br from-white/20 to-white/10 
        backdrop-blur-2xl border border-white/30 p-10 rounded-2xl shadow-2xl 
        text-center max-w-md w-full mx-4"
      >
        {/* Title with bouncy spanner */}
        <motion.h1
          variants={cardVariants}
          className="text-3xl font-extrabold text-white mb-6 flex flex-col items-center space-y-3"
        >
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
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-500/80 hover:bg-blue-500 text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-400 mt-3">{error}</p>}

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
