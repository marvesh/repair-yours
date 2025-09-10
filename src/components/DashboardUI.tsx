"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Plug, Droplet, Laptop, Phone } from "lucide-react";

// Slideshow images
const slides = [
  { src: "/phone-repair1.jpg", caption: "Expert Phone Repair" },
  { src: "/laptop-repair.jpg", caption: "Laptop & PC Services" },
  { src: "/plumbing2.jpg", caption: "Plumbing Solutions" },
  { src: "/Electrician2.jpg", caption: "Professional Electricians" },
];

// Demo technicians list
const technicians = [
  { name: "John Doe", skill: "Plumber", distance: "5km", rating: 4.5 },
  { name: "Mary Smith", skill: "Electrician", distance: "2km", rating: 4.8 },
  { name: "James Lee", skill: "Phone Repair", distance: "8km", rating: 4.3 },
];

// Profile type
type Profile = {
  id: string;
  full_name: string | null;
  role: "technician" | "user";
  created_at: string;
};

export default function DashboardUI({ profile }: { profile: Profile | null }) {
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

      {/* Slideshow */}
      <div className="relative w-full max-w-2xl mx-auto mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].caption}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 text-center text-sm">
              {slides[current].caption}
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-4 bg-gray-800/70 p-2 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-4 bg-gray-800/70 p-2 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 px-6">
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
          <Plug className="text-yellow-400 mb-2" />
          <p className="text-lg font-bold">24</p>
          <span className="text-sm text-gray-400">Jobs Completed</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
          <Droplet className="text-blue-400 mb-2" />
          <p className="text-lg font-bold">5</p>
          <span className="text-sm text-gray-400">Pending Requests</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
          <Laptop className="text-green-400 mb-2" />
          <p className="text-lg font-bold">12</p>
          <span className="text-sm text-gray-400">Technicians Nearby</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
          <Phone className="text-pink-400 mb-2" />
          <p className="text-lg font-bold">4.7</p>
          <span className="text-sm text-gray-400">Avg. Rating</span>
        </div>
      </section>

      {/* Technician List */}
      <section className="mt-10 px-6">
        <h2 className="text-lg font-semibold mb-4">Available Technicians</h2>
        <div className="space-y-3">
          {technicians.map((tech, i) => (
            <div
              key={i}
              className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-bold">{tech.name}</p>
                <p className="text-sm text-gray-400">{tech.skill}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{tech.distance} away</p>
                <p className="text-yellow-400 text-sm">⭐ {tech.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
