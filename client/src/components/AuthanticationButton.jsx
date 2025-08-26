import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useClerk, SignInButton } from "@clerk/clerk-react";

const AuthanticationButton = () => {
  const { user } = useAuth(); // check login
  const { signOut } = useClerk();
  const navigate = useNavigate();

  if (user) {
    // User is logged in → show Get Started Now + optional Sign Out
    return (
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/ai")}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full shadow-lg text-base md:text-lg font-medium hover:scale-105 hover:shadow-emerald-500/30 transition-transform duration-300 relative z-10"
        >
          Get Started Now
        </button>

        {/* Optional Sign Out button */}
        <button
          onClick={() => signOut()}
          className="bg-red-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full shadow-lg text-base md:text-lg font-medium hover:scale-105 hover:shadow-red-500/30 transition-transform duration-300 relative z-10"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // User not logged in → show Make Account (opens Clerk modal)
  return (
    <SignInButton mode="modal">
      <button
        className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full shadow-lg text-base md:text-lg font-medium hover:scale-105 hover:shadow-emerald-500/30 transition-transform duration-300 relative z-10"
      >
        Make Account
      </button>
    </SignInButton>
  );
};

export default AuthanticationButton;
