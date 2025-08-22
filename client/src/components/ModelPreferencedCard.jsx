import React, { useState } from 'react';

const ModelPreferencesCard = () => {
  const [selectedModels, setSelectedModels] = useState({
    chatGPT5: true,
    geminiPro: true,
    deepSeek: true,
    perplexity: true,
    claudeSonnet: true,
    grok4: true
  });

  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const toggleModel = (model) => {
    setSelectedModels(prev => ({
      ...prev,
      [model]: !prev[model]
    }));
  };

  const models = [
    {
      id: 'chatGPT5',
      name: 'ChatGPT 5',
      description: "OpenAI's most capable model",
      free: true
    },
    {
      id: 'geminiPro',
      name: 'Gemini 2.5 Pro',
      description: "Google's multimodal AI model",
      free: true
    },
    {
      id: 'deepSeek',
      name: 'DeepSeek',
      description: "DeepSeek's reasoning model",
      free: true
    },
    {
      id: 'perplexity',
      name: 'Perplexity Sonar Pro',
      description: "AI-powered search and reasoning",
      premium: true
    },
    {
      id: 'claudeSonnet',
      name: 'Claude Sonnet 4',
      description: "Anthropic's advanced AI assistant",
      premium: true
    },
    {
      id: 'grok4',
      name: 'Grok 4',
      description: "xAI's conversational AI",
      premium: true
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-xl font-bold">Customize your AI model preferences</h2>
        <p className="text-sm opacity-90 mt-1">Easily update your selections anytime in settings</p>
      </div>

      {/* Model List */}
      <div className="p-6">
        <div className="space-y-4">
          {models.map((model) => (
            <div key={model.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{model.name}</h3>
                <p className="text-sm text-gray-500">{model.description}</p>
                {model.premium && (
                  <span className="inline-block mt-1 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <button
                onClick={() => model.premium ? setIsPremiumModalOpen(true) : toggleModel(model.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  selectedModels[model.id] ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                disabled={model.premium}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    selectedModels[model.id] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Update Button */}
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Update preferences
        </button>

        {/* Premium Upgrade */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
          <h3 className="font-medium text-purple-800">Upgrade and Unlock Premium AI Models</h3>
          <p className="text-sm text-purple-600 mt-1">
            Access all six top AI models and enhance your experience for just $12 a month.
          </p>
          <button 
            onClick={() => setIsPremiumModalOpen(true)}
            className="mt-3 text-sm font-medium text-purple-700 hover:text-purple-900 underline"
          >
            Learn more →
          </button>
        </div>
      </div>

      {/* Premium Modal */}
      {isPremiumModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Unlock Premium Models</h3>
            <p className="text-gray-600 mb-4">
              Upgrade to our premium plan to access all AI models for just $12/month.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsPremiumModalOpen(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
              >
                Later
              </button>
              <button
                onClick={() => {
                  // Handle upgrade logic
                  setIsPremiumModalOpen(false);
                }}
                className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPreferencesCard;