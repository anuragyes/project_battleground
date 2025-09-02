import React from 'react';
import SectionFirst from './SectionFirst';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';  // ✅ useUser instead of useAuth
import toast from 'react-hot-toast';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser(); // ✅ now you get user + login status

  const handleGetStarted = () => {
    if (!isSignedIn) {
      toast.error("Oops, please login first 🚨");
      
    }

    toast.success(`Welcome ${user.firstName || "back"} 🎉`);
    navigate("/ai");
  };

  return (
    <>
      <section className="relative h-screen w-full bg-black text-white pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Side Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-block bg-neutral-900 border border-gray-700 text-sm text-emerald-400 px-4 py-1 rounded-full">
              Built by Team of SIRT
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              World’s Most Powerful AIs.
              <br className="hidden md:block" /> One Subscription.
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Stop juggling tabs and subscriptions – Ai-Battlegrounda gives you access to
              all best-in-class AI models for just{" "}
              <span className="text-white font-semibold">$12/month</span>.{" "}
              That’s almost half of what you'd pay for a single premium AI chat subscription.
            </p>

            <div>
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full shadow-lg text-base md:text-lg font-medium hover:scale-105 hover:shadow-emerald-500/30 transition-transform duration-300 relative z-10"
              >
                Get Started Now
              </button>
            </div>

            <p className="text-xs md:text-sm text-gray-500">
              Experience smarter & more accurate answers
            </p>
          </div>

          {/* Right Side Placeholder */}
          <div className="flex-1 flex justify-center w-full">
            <div className="w-full max-w-[600px] aspect-video rounded-2xl border border-gray-800 shadow-lg overflow-hidden bg-neutral-900 flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-base">🎥 Your Video Here</span>
            </div>
          </div>
        </div>
      </section>

      <SectionFirst />
    </>
  );
};

export default HeroSection;
