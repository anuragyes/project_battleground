import React from 'react';
import FQNA from './FQNA';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';  // ✅ useUser instead of useAuth
import toast from 'react-hot-toast';
const AIModelsShowcase = () => {

  const navigate = useNavigate();

  const { isSignedIn, user } = useUser(); // ✅ now you get user + login status

  const handleGetStarted = () => {
    if (!isSignedIn) {
      toast.error("Oops, please login first 🚨");

    }

    toast.success(`Welcome ${user.firstName || "back"} 🎉`);
    navigate("/ai");
  };
  const competitors = [
    {
      name: "ChatGPT 5",
      specialty: "All-Rounder Explainer",
      limitation: "Limited to text-only, no multi-model comparison",
      icon: "💡",
      color: "from-emerald-400 to-teal-500"
    },
    {
      name: "Claude Sonnet 4",
      specialty: "Writing Master",
      limitation: "No live web access or image analysis",
      icon: "✍️",
      color: "from-purple-400 to-indigo-500"
    },
    {
      name: "Gemini 2.5 Pro",
      specialty: "Long Context Master",
      limitation: "Struggles with creative tasks",
      icon: "📜",
      color: "from-blue-400 to-cyan-500"
    },
    {
      name: "Perplexity Sonar Pro",
      specialty: "Live Web Research",
      limitation: "Weak at coding/math tasks",
      icon: "🔍",
      color: "from-amber-400 to-orange-500"
    },
    {
      name: "DeepSeek",
      specialty: "Reasoning Specialist",
      limitation: "No creative content generation",
      icon: "🧮",
      color: "from-red-400 to-pink-500"
    },
    {
      name: "Grok 4",
      specialty: "Creative Powerhouse",
      limitation: "Unreliable for factual accuracy",
      icon: "🎨",
      color: "from-violet-400 to-fuchsia-500"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        {/* Battlefield Background Effect */}
        <div className="fixed inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9IiNmZmZmZmYwMiIgc3Ryb2tlLXdpZHRoPSIxIj4KICA8cGF0aCBkPSJNIDAgMCBMIDYwIDYwIE0gNjAgMCBMIDAgNjAiLz4KPC9zdmc+')]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-red-500 to-yellow-500 p-1 rounded-full mb-6">
              <div className="bg-gray-900 px-4 py-1 rounded-full text-sm font-bold text-white">
                THE ULTIMATE AI SHOWDOWN
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">AI BATTLEGROUND</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Why choose one AI when you can have <span className="font-bold text-yellow-400">ALL THEIR POWERS</span> in one superior platform?
            </p>
          </div>

          {/* Competitor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {competitors.map((model, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${model.color} rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 transform transition-all hover:scale-[1.02]`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{model.icon}</span>
                    <h2 className="text-2xl font-bold text-white">{model.name}</h2>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg mb-4">
                    <h3 className="text-sm font-semibold text-yellow-300 mb-1">SPECIALTY:</h3>
                    <p className="text-white">{model.specialty}</p>
                  </div>
                  <div className="bg-red-900/30 p-4 rounded-lg mb-4 border border-red-500/30">
                    <h3 className="text-sm font-semibold text-red-300 mb-1">LIMITATION:</h3>
                    <p className="text-red-200">{model.limitation}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center text-sm text-white/70">
                      <svg className="w-4 h-4 mr-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Available in <span className="font-bold text-white">AI Battleground</span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Battleground Showcase */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.3)]">
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                  <div className="inline-block bg-gradient-to-r from-yellow-500 to-red-500 p-0.5 rounded-full mb-6">
                    <span className="bg-gray-900 px-4 py-1 rounded-full text-sm font-bold text-white">
                      THE ULTIMATE WINNER
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">AI BATTLEGROUND</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    The only platform that combines <span className="text-yellow-300 font-bold">all these capabilities</span> plus exclusive features:
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-100">Side-by-side model comparison</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-100">Intelligent model routing</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-100">Consolidated billing</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-100">Unified API access</span>
                    </li>
                  </ul>
                  <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
                    Claim Victory - Try Now
                  </button>
                </div>
                <div className="lg:w-1/2 bg-black/30 border-2 border-yellow-500/20 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="inline-block bg-yellow-500/20 p-4 rounded-full mb-4">
                      <svg className="w-12 h-12 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI BATTLEGROUND IN ACTION</h3>
                    <p className="text-yellow-200">(Your product demo video here)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to dominate the AI landscape?</h3>
            <div className="inline-block bg-gradient-to-r from-yellow-500 to-red-500 p-0.5 rounded-full">
              <button
                onClick={handleGetStarted}


                className="px-8 py-4 bg-gray-900 rounded-full text-white font-bold hover:bg-transparent transition-all text-lg">
                Start Your Free Trial Today →
              </button>
            </div>
          </div>
        </div>
      </div>


      <FQNA />

    </>
  );
};

export default AIModelsShowcase;