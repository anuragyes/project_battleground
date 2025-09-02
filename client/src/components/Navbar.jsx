import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("features");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();
  const { openSignIn, signOut } = useClerk();
  const navigate = useNavigate();

  const handleNavClick = (link, path) => {
    setActiveLink(link);
    setIsMenuOpen(false); // close menu on mobile after click
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="text-white font-bold text-lg">
            {/* Replace with logo */}
            AI-Battleground
          </a>
        </div>

        {/* Middle: Nav Links (Desktop only) */}
        <div className="hidden md:flex gap-1 bg-gray-900/80 border border-gray-800 rounded-full px-2 py-1 shadow-lg">
          {[
            { key: "features", label: "Features", path: "/" },
            { key: "pricing", label: "Pricing", path: "/pricing" },
            { key: "faqs", label: "FAQs", path: "/Fqa" },
            { key: "about", label: "About", path: "/about" },
          ].map((item) => (
            <button
              key={item.key}
              className={`relative px-5 py-1.5 text-sm rounded-full transition-all duration-300 ${
                activeLink === item.key
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => handleNavClick(item.key, item.path)}
            >
              {activeLink === item.key && (
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full -z-10" />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Auth Button (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => signOut(() => navigate("/"))}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                    userButtonPopoverCard: "bg-gray-900 border border-gray-800",
                  },
                }}
              />
            </>
          ) : (
            <button
              onClick={() => openSignIn({})}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isMenuOpen ? (
              // Close Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 border-t border-gray-800">
          <div className="px-4 py-3 flex flex-col space-y-3">
            {[
              { key: "features", label: "Features", path: "/" },
              { key: "pricing", label: "Pricing", path: "/pricing" },
              { key: "faqs", label: "FAQs", path: "/Fqa" },
              { key: "about", label: "About", path: "/about" },
            ].map((item) => (
              <button
                key={item.key}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  activeLink === item.key
                    ? "text-white bg-emerald-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
                onClick={() => handleNavClick(item.key, item.path)}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-700">
              {user ? (
                <>
                  <button
                    onClick={() => signOut(() => navigate("/"))}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:text-white text-sm"
                  >
                    Sign Out
                  </button>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                        userButtonPopoverCard: "bg-gray-900 border border-gray-800",
                      },
                    }}
                  />
                </>
              ) : (
                <button
                  onClick={() => openSignIn({})}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow-md text-sm"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
