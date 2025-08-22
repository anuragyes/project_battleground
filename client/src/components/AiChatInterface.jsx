// AiChatInterface.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiSend, FiLock } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";
import { Lightbulb, Crown } from "lucide-react";
import axios from "axios";
import Markdown from "react-markdown";
import { FaRobot } from "react-icons/fa";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AiChatInterface = () => {


  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [lockedModels, setLockedModels] = useState({});
  const messageContainerRef = useRef(null);

  const [on, setOn] = useState(false); // lightbulb glow
  const { getToken } = useAuth();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const navigate = useNavigate();

  // Define AI models
  const aiModels = [
    {
      id: "gemini",
      name: "Gemini Pro",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      endpoint: "/api/googleai/generate-googleai",
      locked: false,
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      endpoint: "/api/deepseek/generate-deepseek",
      locked: false,
    },
    {
      id: "perplexity",
      name: "Perplexity.AI",
      color: "bg-orange-100",
      textColor: "text-orange-700",
      locked: true,
      upgradeMessage: "Upgrade to access Perplexity.AI's advanced capabilities"
    },
    {
      id: "grok",
      name: "Grok",
      color: "bg-red-100",
      textColor: "text-red-600",
      locked: true,
      upgradeMessage: "Unlock Grok's unique AI with a premium subscription"
    },
    {
      id: "claude",
      name: "Claude",
      color: "bg-red-100",
      textColor: "text-red-600",
      locked: true,
      upgradeMessage: "Unlock Claude with a premium subscription"
    },
  ];

  // Init conversations
  useEffect(() => {
    const initialConvos = {};
    const initialLoading = {};
    const initialLocked = {};

    aiModels.forEach((m) => {
      initialConvos[m.id] = [];
      initialLoading[m.id] = false;
      initialLocked[m.id] = m.locked || false;
    });

    setConversations(initialConvos);
    setIsLoading(initialLoading);
    setLockedModels(initialLocked);
  }, []);

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const newConvos = { ...conversations };
    const newLoading = { ...isLoading };

    aiModels.forEach((m) => {
      if (lockedModels[m.id]) {
        // For locked models, show upgrade message immediately
        newConvos[m.id] = [
          ...newConvos[m.id],
          { id: Date.now(), sender: "user", text: inputMessage },
          {
            id: Date.now() + 1,
            sender: "system",
            text: m.upgradeMessage || "Upgrade your plan to access this AI model",
            ai: m.name,
            isUpgrade: true,
          },
        ];
        newLoading[m.id] = false;
      } else {
        newConvos[m.id] = [
          ...newConvos[m.id],
          { id: Date.now(), sender: "user", text: inputMessage },
        ];
        newLoading[m.id] = true;
      }
    });

    setConversations(newConvos);
    setIsLoading(newLoading);
    setInputMessage("");

    const token = await getToken();

    aiModels.forEach(async (model) => {
      if (lockedModels[model.id] || !model.endpoint) {
        return;
      }

      try {
        const { data } = await axios.post(
          model.endpoint,
          { prompt: inputMessage },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const aiText = data?.content || "⚠️ No response from AI";


        console.log(aiText)
        setConversations((prev) => ({
          ...prev,
          [model.id]: [
            ...prev[model.id],
            {
              id: Date.now() + model.id,
              sender: "ai",
              text: aiText,
              ai: model.name,
            },
          ],
        }));
      } catch (err) {
        console.error(`Error calling ${model.name}:`, err);
        setConversations((prev) => ({
          ...prev,
          [model.id]: [
            ...prev[model.id],
            {
              id: Date.now() + model.id,
              sender: "ai",
              text: "⚠️ Error fetching response",
              ai: model.name,
              isError: true,
            },
          ],
        }));
      } finally {
        setIsLoading((prev) => ({ ...prev, [model.id]: false }));
      }
    });
  };

  // Lightbulb enhance
  const handleEnhanceText = async () => {
    if (!inputMessage.trim()) {
      toast.error("Please type something to enhance");
      return;
    }

    try {
      const token = await getToken();
      setOn(true);
      const { data } = await axios.post(
        "/api/lightup/generate-lightup",
        { input: inputMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.output) {
        setInputMessage(data.output);
        toast.success("Text enhanced successfully!");
      } else {
        toast.error("No response from AI");
      }
    } catch (err) {
      console.error("Error enhancing text:", err);
      toast.error("Failed to enhance text");
    } finally {
      setOn(false);
    }
  };

  // Scroll container
  const scrollContainer = (direction) => {
    if (messageContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      messageContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll down for each chat
  useEffect(() => {
    const chatBoxes = document.querySelectorAll(".chat-scroll");
    chatBoxes.forEach((box) => {
      box.scrollTop = box.scrollHeight;
    });
  }, [conversations]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 lg:w-72 bg-gray-900 text-white flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold flex items-center">
            <FaRobot className="mr-2 text-blue-400" />
            AI_BattleGround
          </h1>
        </div>

        {/* New Chat */}
        <div className="p-4">
          <button
            onClick={() => {
              const resetConvos = {};
              aiModels.forEach((m) => (resetConvos[m.id] = []));
              setConversations(resetConvos);
              toast.success("New Chat Started");
            }}
            className="flex items-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            <FiPlus className="mr-2" />
            New Chat
          </button>
        </div>

        {/* --- 🔥 Three Action Buttons at Bottom --- */}
        <div className="p-4 space-y-2 mt-auto">
          <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition">
            Generate Image
          </button>
          <button className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition">
            Remove Background
          </button>
          <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition">
            Remove Object
          </button>
        </div>

        {/* Profile */}
        {user && (
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg mx-4 mb-4">
            <img
              src={user.imageUrl}
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <div>
              <p className="text-sm font-semibold">{user.fullName}</p>
              <button
                onClick={openUserProfile}
                className="text-xs text-gray-400 hover:text-indigo-400"
              >
                View Profile
              </button>
              <button
                onClick={() => signOut()}
                className="block text-xs text-red-400 hover:text-red-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Models row */}
        <div className="relative flex-1">
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-gray-100 z-10"
          >
            <IoIosArrowBack size={20} />
          </button>

          <div
            ref={messageContainerRef}
            className="flex overflow-x-auto h-full px-6 py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          >
            {aiModels.map((model) => (
              <div
                key={model.id}
                className="flex-shrink-0 w-full sm:w-96 mx-2 bg-white rounded-lg border border-gray-200 shadow flex flex-col relative"
              >
                {/* Header */}
                <div
                  className={`${model.color} ${model.textColor} p-3 font-medium flex items-center justify-between`}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-current opacity-70"></div>
                    {model.name}
                    {lockedModels[model.id] && (
                      <FiLock className="ml-2" size={14} />
                    )}
                  </div>
                  {isLoading[model.id] && (
                    <div className="w-4 h-4 border-t-2 border-r-2 border-current rounded-full animate-spin"></div>
                  )}
                </div>

                {/* Locked overlay */}
                {lockedModels[model.id] && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center p-4 z-10 rounded-lg">
                    <div className="text-center mb-4">
                      <Crown className="mx-auto text-yellow-500" size={40} />
                      <h3 className="font-bold text-lg mt-2 text-gray-800">
                        Premium Feature
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {model.upgradeMessage || "Upgrade to unlock this AI model"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/upgrade");
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}

                {/* Chat Messages */}
                <div className="chat-scroll flex-1 overflow-y-auto max-h-[400px] p-3 space-y-3">
                  {(conversations[model.id] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user"
                        ? "justify-end"
                        : msg.sender === "system"
                          ? "justify-center items-center"
                          : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-xs rounded-lg p-3 text-sm ${msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : msg.isError
                            ? "bg-red-100 text-red-700"
                            : msg.isUpgrade
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-6 text-center"
                              : "bg-gray-200 text-gray-800"
                          }`}
                      >
                        {msg.isUpgrade ? (
                          <div className="text-center">
                            <Crown className="mx-auto mb-2" size={24} />
                            <p className="font-semibold mb-1">Premium Feature</p>
                            <p className="text-sm">{msg.text}</p>
                            <button className="mt-3 px-3 py-1 bg-white text-purple-600 rounded text-xs font-medium hover:bg-gray-100 transition">
                              Upgrade Now
                            </button>
                          </div>
                        ) : msg.sender === "ai" || msg.sender === "system" ? (
                          <Markdown>{msg.text}</Markdown>
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-gray-100 z-10"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-2 shadow">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything..."
              rows={1}
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none resize-none px-3 py-2 min-h-[40px] max-h-32 overflow-y-auto"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            <button
              onClick={handleEnhanceText}
              className="p-3 flex items-center justify-center"
            >
              <Lightbulb
                size={26}
                className={`transition-colors ${on
                  ? "text-yellow-400 drop-shadow-[0_0_10px_rgb(250,204,21)]"
                  : "text-gray-500"
                  }`}
              />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={
                !inputMessage.trim() || Object.values(isLoading).some((s) => s)
              }
              className={`ml-2 flex items-center justify-center h-10 w-10 rounded-full transition ${inputMessage.trim() && !Object.values(isLoading).some((s) => s)
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
            >
              {Object.values(isLoading).some((s) => s) ? "..." : <FiSend />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;



