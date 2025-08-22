import React, { useState } from "react";

const VideoYT = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Watch Ai-Battlegrounda Catch What Others Miss
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          Real question. Real answers. See which AI gets it right.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Frame */}
          <div className="w-full lg:w-2/3">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
              <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20 flex items-center justify-center">
                  {!isPlaying && (
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-20 h-20 flex items-center justify-center transition-all hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  
                  {isPlaying && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <div className="text-center p-4">
                        <p className="text-lg mb-4">Your video would play here</p>
                        <button 
                          onClick={() => setIsPlaying(false)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Stop Demo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">
                  Can a second apple developer account have the same DUNS account as another developer account to deploy an app to it?
                </h2>
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch on YouTube
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    Share
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Watch later
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Panel */}
          <div className="w-full lg:w-1/3 flex flex-col p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              The Results Will Surprise You
            </h2>
            
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-start gap-3 bg-green-900/40 p-4 rounded-xl border border-green-500/30 transition-all hover:scale-[1.02]">
                <span className="text-xl mt-0.5">✅</span>
                <p><strong className="text-green-300">2 out of 6 got it right</strong> — Gave accurate, actionable answers</p>
              </div>

              <div className="flex items-start gap-3 bg-yellow-900/40 p-4 rounded-xl border border-yellow-500/30 transition-all hover:scale-[1.02]">
                <span className="text-xl mt-0.5">⚠️</span>
                <p><strong className="text-yellow-300">3 out of 6 were incomplete</strong> — Provided partial or incomplete information</p>
              </div>

              <div className="flex items-start gap-3 bg-red-900/40 p-4 rounded-xl border border-red-500/30 transition-all hover:scale-[1.02]">
                <span className="text-xl mt-0.5">❌</span>
                <p><strong className="text-red-300">1 out of 6 was wrong</strong> — Gave misleading guidance</p>
              </div>
            </div>

            <a
              href="#"
              className="text-center py-3 px-6 bg-gradient-to-r from-blue-500 to-green-400 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Get smarter & more accurate AI answers
            </a>

            <p className="text-gray-400 text-sm mt-4 text-center italic">
              This is why comparing matters — get the full picture every time
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">What's more?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch Ai-Battlegrounda Catch What ChatGPT, Gemini, Claude, Perplexity and others miss in their responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoYT