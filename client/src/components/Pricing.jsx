import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const text = "Limited time: Save 90% compared to individual subscriptions";

  const navigate = useNavigate();

  const handleMonthlyPlan = () => {
    console.log("Monthly Plan clicked");
    navigate("/ai");
  };

  const handleYearlyPlan = () => {
    console.log("Yearly Plan clicked");
    navigate("/paytoprocced");
  };

  const handleUltimatePlan = () => {
    console.log("Ultimate Plan clicked");
    navigate("/");
  };

  return (
   <>

     <section className="relative h-72 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-600 text-white overflow-hidden">
        {/* Content */}
        <div className="relative z-10 text-center px-4">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Get <span className="text-white">6 Premium AI Models</span> <br />
            for Half the Price of One
          </motion.h1>

          {/* Firewave Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 inline-flex items-center gap-2 bg-black border border-green-500 rounded-full px-4 py-2 text-sm sm:text-base"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="firewave-text font-bold">
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </div>
      </section>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4">
            AI BattleGround
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One subscription to rule all AI models - simpler, smarter, and more
            powerful
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Current Individual Subscriptions */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-300 mb-6">
              Individual AI Subscriptions
            </h2>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-white">$110</span>
              <span className="ml-2 text-gray-400">(=¥10,000)</span>
            </div>
            <p className="text-gray-400 mb-8">What you're paying now</p>

            <div className="space-y-4 mb-8">
              {[
                { name: "ChatGPT 5", price: "$20/mo" },
                { name: "Google Gemini 2.5Pro", price: "$20/mo" },
                { name: "Perplexity Sonar Pro", price: "$20/mo" },
                { name: "Claude Sonnet 4", price: "$20/mo" },
                { name: "Grok 4", price: "$30/mo" },
              ].map((ai, index) => (
                <div
                  key={index}
                  className="flex justify-between py-3 border-b border-gray-700/50"
                >
                  <span className="text-gray-300">{ai.name}</span>
                  <span className="text-emerald-400">{ai.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VS Logo */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 blur-xl"></div>
              <div className="relative flex items-center justify-center w-24 h-24 bg-gray-800 border-2 border-emerald-400/30 rounded-full text-white text-2xl font-bold">
                VS
              </div>
            </div>
            <span className="mt-4 text-gray-400 text-sm">COMPARE & SAVE</span>
          </div>

          {/* Ai-Battleground Plans */}
          <div className="space-y-6">
            {/* Monthly Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Monthly Plan
                  </h3>
                  <p className="text-gray-400">Flexible monthly access</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-emerald-400">
                    ¥9,999
                  </span>
                  <span className="block text-gray-400 text-sm">per month</span>
                </div>
              </div>
              <button
                onClick={handleMonthlyPlan}
                className="w-full bg-emerald-600 cursor-pointer hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
              >
                Get Started →
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-teal-500/30 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded">
                SAVE 17%
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Yearly Plan
                  </h3>
                  <p className="text-gray-400">
                    Best value with annual commitment
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-teal-400">
                    ¥99,999
                  </span>
                  <span className="block text-gray-400 text-sm">per year</span>
                </div>
              </div>
              <button
                onClick={handleYearlyPlan}
                className="w-full bg-teal-600 cursor-pointer hover:bg-teal-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/20"
              >
                Get Started →
              </button>
            </div>

            {/* Ultimate Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 group">
              <h3 className="text-2xl font-semibold text-white mb-2">
                ULTIMATE PROMPTBOOK & COMMUNITY ACCESS
              </h3>
              <div className="mb-6">
                {[
                  "All premium AI models included",
                  "Side-by-side comparison",
                  "400,000 tokens/month",
                  "Instant prompt enhancement",
                  "Image generation & Audio transcription",
                ].map((feature, index) => (
                  <p
                    key={index}
                    className="text-gray-300 mb-2 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </p>
                ))}
              </div>
              <button
                onClick={handleUltimatePlan}
                className="w-full bg-purple-600 cursor-pointer hover:bg-purple-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
   
   </>
  );
};

export default Pricing;
