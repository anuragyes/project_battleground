


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';


export default function Navbar() {
  const [activeLink, setActiveLink] = useState('features');
  const { user } = useUser();          // ✅ user comes from useUser
  const { openSignIn, signOut } = useClerk(); // ✅ openSignIn & signOut come from useClerk
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <a href="#" className="group flex items-center">
            {/* put logo here */}
          </a>
        </div>

        {/* Middle: Nav Links */}


        <div className="flex-1 flex justify-center">
          <div className="flex gap-1 bg-gray-900/80 border border-gray-800 rounded-full px-2 py-1 shadow-lg backdrop-blur-sm">

            {/* Features */}
            <button
              className={`relative px-5 py-1.5 text-sm rounded-full transition-all duration-300 ${activeLink === "features"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
                }`}
              onClick={() => {
                setActiveLink("features");
                // navigate("/features"); // 👈 navigate instead of href
                navigate("/")
              }}
            >
              {activeLink === "features" && (
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full -z-10" />
              )}
              Features
            </button>

            {/* Pricing */}
            <button
              className={`relative px-5 py-1.5 text-sm rounded-full transition-all duration-300 ${activeLink === "pricing"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
                }`}
              onClick={() => {
                setActiveLink("pricing");
                navigate("/pricing");
              }}
            >
              {activeLink === "pricing" && (
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full -z-10" />
              )}
              Pricing
            </button>

            {/* FAQs */}
            <button
              className={`relative px-5 py-1.5 text-sm rounded-full transition-all duration-300 ${activeLink === "faqs"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
                }`}
              onClick={() => {
                setActiveLink("faqs");
                navigate("/Fqa");
              }}
            >
              {activeLink === "faqs" && (
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full -z-10" />
              )}
              FAQs
            </button>

            {/* About */}
            <button
              className={`relative px-5 py-1.5 text-sm rounded-full transition-all duration-300 ${activeLink === "about"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
                }`}
              onClick={() => {
                setActiveLink("about");
                navigate("/about");
              }}
            >
              {activeLink === "about" && (
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full -z-10" />
              )}
              About
            </button>
          </div>
        </div>

        {/* Right: Auth Button */}
        <div className="flex-1 flex justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => signOut(() => navigate('/'))}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                    userButtonPopoverCard: "bg-gray-900 border border-gray-800"
                  }
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => openSignIn({})} // ✅ this will open Clerk login
              className="relative overflow-hidden group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10 flex items-center">
                Log In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
