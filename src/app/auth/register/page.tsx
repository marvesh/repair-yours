"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Wrench } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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

export default function Register() {
  const [role, setRole] = useState<"user" | "technician">("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skill: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Create user in Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = data?.user;
    if (!user) {
      setError("Signup failed, please try again.");
      setLoading(false);
      return;
    }

    // 2. Insert into profiles table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id, // link to auth.users.id
        full_name: form.name,
        role: role,
        // Save skill only if technician
        skill: role === "technician" ? form.skill : null,
      },
    ]);

    if (profileError) {
      setError(profileError.message);
    } else {
      alert("Registration successful! Please check your email to confirm.");
    }

    setLoading(false);
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
        {/* Title with bouncing spanner */}
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
          <span>Register</span>
        </motion.h1>

        {/* Toggle Role */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setRole("user")}
            type="button"
            className={`flex-1 py-2 rounded-lg ${
              role === "user"
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-200"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("technician")}
            type="button"
            className={`flex-1 py-2 rounded-lg ${
              role === "technician"
                ? "bg-green-500 text-white"
                : "bg-white/10 text-gray-200"
            }`}
          >
            Technician
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
            required
          />

          {role === "technician" && (
            <input
              type="text"
              name="skill"
              placeholder="Skill (e.g. Plumber, Phone Repair)"
              value={form.skill}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-green-500/80 hover:bg-green-500 text-white font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        <p className="text-gray-200 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-300 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
