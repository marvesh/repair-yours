"use client";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// "Idle bounce" effect after a delay
const heroWrenchAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    y: [0, -10, 0],
  },
  transition: {
    delay: 3, // wait 3 seconds before nudging
    duration: 1.5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 5, // wait 5s between nudges
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/tire.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navbar with logo */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-6 z-20">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Wrench className="w-8 h-8 text-white" />
          <span className="text-white font-extrabold text-xl">Handyman</span>
        </div>

        {/* Optional nav links */}
        <div className="space-x-6 hidden md:flex">
          <Link href="/book" className="text-gray-200 hover:text-white"></Link>
          <Link href="/become" className="text-gray-200 hover:text-white"></Link>
          <Link href="/login" className="text-gray-200 hover:text-white"></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 
          bg-gradient-to-br from-white/20 to-white/10 
          backdrop-blur-2xl 
          border border-white/30 
          p-10 rounded-2xl shadow-2xl 
          text-center max-w-md w-full mx-4"
      >
        {/* Title */}
        <motion.h1
          variants={item}
          className="text-4xl font-extrabold text-white mb-4 flex items-center justify-center space-x-3 drop-shadow-lg"
        >
          {/* Hero Wrench with "idle bounce" */}
          <motion.div
            initial="initial"
            animate="animate"
            transition={heroWrenchAnimation.transition}
            variants={{
              initial: heroWrenchAnimation.initial,
              animate: heroWrenchAnimation.animate,
            }}
          >
            <Wrench className="w-28 h-28 text-white" />
          </motion.div>
          <span>Welcome to Handyman!</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="text-lg text-gray-100 font-medium mb-6"
        >
          Find trusted technicians or join as one.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={item} className="flex flex-col space-y-3">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(59,130,246,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/book"
              className="bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition backdrop-blur-sm block"
            >
              Book a Technician
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(34,197,94,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/become"
              className="bg-green-500/80 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition backdrop-blur-sm block"
            >
              Become a Technician
            </Link>
          </motion.div>
        </motion.div>

        {/* Login Link */}
        <motion.p variants={item} className="mt-6 text-gray-200">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-300 hover:underline">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
