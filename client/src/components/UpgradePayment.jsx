import React, { useState } from 'react';
import { Check, Crown, Sparkles, ImageIcon, Upload } from 'lucide-react';

const UpgradePayment = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="text-yellow-500 mr-2" size={32} />
            <h1 className="text-4xl font-bold text-gray-900">Upgrade your plan</h1>
          </div>
          <p className="text-gray-600 text-lg">Unlock the full potential of AI_BattleGround</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Monthly Plan */}
          <div 
            className={`bg-white rounded-2xl shadow-lg p-8 border-2 transition-all ${
              selectedPlan === 'monthly' 
                ? 'border-purple-500 transform scale-105' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">INR 999</h2>
                <p className="text-gray-600">Monthly billing</p>
              </div>
              {selectedPlan === 'monthly' && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>400,000 tokens/month</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>All latest & premium AI models included</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Side-by-side comparison</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Instant prompt enhancement</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Image generation & Audio transcription</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Ultimate PromptBook</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Community Access</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Free future AI Model upgrades</span>
              </li>
            </ul>

            <button className={`w-full py-3 rounded-lg font-medium transition ${
              selectedPlan === 'monthly'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}>
              Get monthly plan
            </button>
          </div>

          {/* Yearly Plan */}
          <div 
            className={`bg-white rounded-2xl shadow-lg p-8 border-2 transition-all ${
              selectedPlan === 'yearly' 
                ? 'border-purple-500 transform scale-105' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">INR 9,999</h2>
                <div className="flex items-baseline">
                  <p className="text-gray-600 mr-2">/year</p>
                  <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded">
                    Save INR 1,989/year
                  </span>
                </div>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Best Value
                </div>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>4,800,000 tokens/year</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>All latest & premium AI models included</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Side-by-side comparison</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Instant prompt enhancement</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Image generation & Audio transcription</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Ultimate PromptBook</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Community Access</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-3" size={20} />
                <span>Free future AI Model upgrades</span>
              </li>
            </ul>

            <button className={`w-full py-3 rounded-lg font-medium transition ${
              selectedPlan === 'yearly'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}>
              Get yearly plan
            </button>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generate Image */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <ImageIcon className="text-purple-500 mr-3" size={24} />
                <h3 className="text-lg font-semibold">Generate Image</h3>
              </div>
              <p className="text-gray-600 mb-4">Create stunning AI-generated images with just a text prompt</p>
              <button className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition">  
                Try Image Generation
              </button>
            </div>

            {/* Upload Image */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <Upload className="text-purple-500 mr-3" size={24} />
                <h3 className="text-lg font-semibold">Upload Image</h3>
              </div>
              <p className="text-gray-600 mb-4">Upload and analyze images with AI-powered vision models</p>
              <button className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition">
                Upload Image
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Have questions?</h3>
          <p className="text-gray-600 mb-6">Check out our <a href="#" className="text-purple-600 hover:underline">FAQ</a> or <a href="#" className="text-purple-600 hover:underline">contact support</a></p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Sparkles className="mr-2" size={16} />
            <span>7-day money-back guarantee on all plans</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePayment;