

import React from 'react'

const Pricing = () => {
   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4">
            AI BattleGround
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One subscription to rule all AI models - simpler, smarter, and more powerful
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Current Individual Subscriptions */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-300 mb-6">Individual AI Subscriptions</h2>
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
                <div key={index} className="flex justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-300">{ai.name}</span>
                  <span className="text-emerald-400">{ai.price}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-gray-400">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Multiple subscriptions to manage - expensive
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Constant tab switching
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                No comparison features
              </p>
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

          {/* Ai-Battlegrounda Plans */}
          <div className="space-y-6">
            {/* Monthly Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Monthly Plan</h3>
                  <p className="text-gray-400">Flexible monthly access</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-emerald-400">¥9,999</span>
                  <span className="block text-gray-400 text-sm">per month</span>
                </div>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
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
                  <h3 className="text-2xl font-semibold text-white">Yearly Plan</h3>
                  <p className="text-gray-400">Best value with annual commitment</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-teal-400">¥99,999</span>
                  <span className="block text-gray-400 text-sm">per year</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Currently Website Access
                </p>
              </div>
              <button className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/20">
                Get Started →
              </button>
            </div>

            {/* Ultimate Plan */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 group">
              <h3 className="text-2xl font-semibold text-white mb-2">ULTIMATE PROMPTBOOK & COMMUNITY ACCESS</h3>
              <div className="mb-6">
                {[
                  "All premium AI models included",
                  "Side-by-side comparison",
                  "400,000 tokens/month",
                  "Instant prompt enhancement",
                  "Image generation & Audio transcription"
                ].map((feature, index) => (
                  <p key={index} className="text-gray-300 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </p>
                ))}
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing