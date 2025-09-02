"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Plug, Droplet, Laptop, Phone } from "lucide-react";

const slides = [
  { src: "/phone-repair1.jpg", caption: "Expert Phone Repair" },
  { src: "/laptop-repair.jpg", caption: "Laptop & PC Services" },
  { src: "/plumbing2.jpg", caption: "Plumbing Solutions" },
  { src: "/Electrician2.jpg", caption: "Professional Electricians" },
];

const technicians = [
  { name: "John Doe", skill: "Plumber", distance: "5km", rating: 4.5 },
  { name: "Mary Smith", skill: "Electrician", distance: "2km", rating: 4.8 },
  { name: "James Lee", skill: "Phone Repair", distance: "8km", rating: 4.3 },
];

export default function DashboardUI({ profile }: { profile: any }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <Wrench className="text-blue-400" size={28} />
          <h1 className="font-bold text-xl">Handyman</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          {profile?.full_name?.[0] || "U"}
        </button>
      </header>

      {/* (rest of the UI goes here... same as I gave you before) */}
    </div>
  );
}
