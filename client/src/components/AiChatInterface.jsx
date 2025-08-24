


// // AiChatInterface.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { FiPlus, FiSend, FiLock } from "react-icons/fi";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import toast from "react-hot-toast";
// import { Lightbulb, Crown } from "lucide-react";
// import axios from "axios";
// import Markdown from "react-markdown";
// import { FaRobot } from "react-icons/fa";
// import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";

// // ToggleButton component
// const ToggleButton = ({ isOn, onToggle }) => (
//   <button
//     className="flex items-center justify-between w-56 p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors"
//     onClick={onToggle}
//   >
//     <span className="font-medium text-gray-900">Generate Image</span>
//     <div
//       onClick={(e) => {
//         e.stopPropagation();
//         onToggle();
//       }}
//       className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? "bg-green-500" : "bg-gray-300"
//         }`}
//     >
//       <div
//         className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? "translate-x-7" : "translate-x-0"
//           }`}
//       ></div>
//     </div>
//   </button>
// );

// const AiChatInterface = () => {
//   axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
//   const [imageLoading, setImageLoading] = useState(false);

//   const [inputMessage, setInputMessage] = useState("");
//   const [conversations, setConversations] = useState({});
//   const [isLoading, setIsLoading] = useState({});
//   const [lockedModels, setLockedModels] = useState({});
//   const [generateImageEnabled, setGenerateImageEnabled] = useState(false);
//   const messageContainerRef = useRef(null);
//   const [enhancing, setEnhancing] = useState(false);

//   const { getToken } = useAuth();
//   const { user } = useUser();
//   const { signOut, openUserProfile } = useClerk();
//   const navigate = useNavigate();

//   const aiModels = [
//     { id: "gemini", name: "Gemini Pro", color: "bg-blue-100", textColor: "text-blue-800", endpoint: "/api/googleai/generate-googleai", locked: false },
//     { id: "deepseek", name: "DeepSeek", color: "bg-yellow-100", textColor: "text-yellow-700", endpoint: "/api/deepseek/generate-deepseek", locked: false },
//     { id: "perplexity", name: "Perplexity.AI", color: "bg-orange-100", textColor: "text-orange-700", locked: true, upgradeMessage: "Upgrade to access Perplexity.AI's advanced capabilities" },
//     { id: "grok", name: "Grok", color: "bg-red-100", textColor: "text-red-600", locked: true, upgradeMessage: "Unlock Grok's unique AI with a premium subscription" },
//     { id: "claude", name: "Claude", color: "bg-red-100", textColor: "text-red-600", locked: true, upgradeMessage: "Unlock Claude with a premium subscription" },
//   ];

//   // Initialize conversations
//   useEffect(() => {
//     const initialConvos = {};
//     const initialLoading = {};
//     const initialLocked = {};
//     aiModels.forEach((m) => {
//       initialConvos[m.id] = [];
//       initialLoading[m.id] = false;
//       initialLocked[m.id] = m.locked || false;
//     });
//     setConversations(initialConvos);
//     setIsLoading(initialLoading);
//     setLockedModels(initialLocked);
//   }, []);

//   const scrollContainer = (direction) => {
//     if (messageContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       messageContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };


//   const handleCopyText = (text) => {
//     if (!text) return;
//     navigator.clipboard.writeText(text)
//       .then(() => toast.success("Copied to clipboard!"))
//       .catch(() => toast.error("Failed to copy"));
//   };


//   useEffect(() => {
//     const chatBoxes = document.querySelectorAll(".chat-scroll");
//     chatBoxes.forEach((box) => (box.scrollTop = box.scrollHeight));
//   }, [conversations]);

//   // Toggle image generation
//   const handleToggle = () => setGenerateImageEnabled((prev) => !prev);

//   const handleGenerateImage = async () => {
//     if (!inputMessage.trim()) {
//       toast.error("Please enter a prompt.");
//       return;
//     }

//     try {
//       setImageLoading(true); // start loading
//       const token = await getToken();
//       const fullPrompt = `Generate an image of ${inputMessage} in the style of Realistic`;

//       const { data } = await axios.post(
//         "http://localhost:5000/api/genterateimg/generate-img",
//         // "https://project-battleground.vercel.app/api/genterateimg/generate-img",
//         { prompt: fullPrompt },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         const firstModelId = aiModels[0].id;
//         setConversations((prev) => ({
//           ...prev,
//           [firstModelId]: [
//             ...prev[firstModelId],
//             { id: Date.now(), sender: "user", text: inputMessage },
//             { id: Date.now() + 1, sender: "ai", image: data.content, ai: aiModels[0].name },
//           ],
//         }));
//         setInputMessage("");
//         toast.success("Image generated successfully!");
//       } else {
//         toast.error(data.message || "Image generation failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error generating image");
//     } finally {
//       setImageLoading(false); // stop loading
//     }
//   };


//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) {
//       toast.error("Please enter a message");
//       return;
//     }

//     const newConvos = { ...conversations };
//     const newLoading = { ...isLoading };

//     aiModels.forEach((m) => {
//       if (lockedModels[m.id]) {
//         newConvos[m.id] = [
//           ...newConvos[m.id],
//           { id: Date.now(), sender: "user", text: inputMessage },
//           { id: Date.now() + 1, sender: "system", text: m.upgradeMessage || "Upgrade to access this AI model", ai: m.name, isUpgrade: true },
//         ];
//         newLoading[m.id] = false;
//       } else {
//         newConvos[m.id] = [...newConvos[m.id], { id: Date.now(), sender: "user", text: inputMessage }];
//         newLoading[m.id] = true;
//       }
//     });

//     setConversations(newConvos);
//     setIsLoading(newLoading);
//     const sentText = inputMessage;
//     setInputMessage("");

//     const token = await getToken();
//     aiModels.forEach(async (model) => {
//       if (lockedModels[model.id] || !model.endpoint) return;
//       try {
//         const { data } = await axios.post(model.endpoint, { prompt: sentText }, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
//         const aiText = data?.content || "⚠️ No response from AI";
//         setConversations((prev) => ({
//           ...prev,
//           [model.id]: [...prev[model.id], { id: Date.now() + model.id, sender: "ai", text: aiText, ai: model.name }],
//         }));
//       } catch (err) {
//         console.error(`Error calling ${model.name}:`, err);
//         setConversations((prev) => ({
//           ...prev,
//           [model.id]: [...prev[model.id], { id: Date.now() + model.id, sender: "ai", text: "⚠️ Error fetching response", ai: model.name, isError: true }],
//         }));
//       } finally {
//         setIsLoading((prev) => ({ ...prev, [model.id]: false }));
//       }
//     });
//   };

//   const handleEnhanceText = async () => {
//     if (!inputMessage.trim()) return toast.error("Please type something to enhance");
//     try {
//       setEnhancing(true);
//       const token = await getToken();
//       const { data } = await axios.post("/api/lightup/generate-lightup", { input: inputMessage }, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
//       if (data?.output) setInputMessage(data.output) && toast.success("Text enhanced successfully!");
//       else toast.error("No response from AI");
//     } catch (err) {
//       console.error("Error enhancing text:", err);
//       toast.error("Failed to enhance text");
//     } finally {
//       setEnhancing(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="hidden md:flex w-64 lg:w-72 bg-gray-900 text-white flex-col">
//         <div className="p-4 border-b border-gray-700 flex items-center">
//           <FaRobot className="mr-2 text-blue-400" size={24} />
//           <h1 className="text-xl font-bold">AI_BattleGround</h1>
//         </div>

//         <div className="p-4">
//           <button
//             onClick={() => {
//               const resetConvos = {};
//               aiModels.forEach((m) => (resetConvos[m.id] = []));
//               setConversations(resetConvos);
//               toast.success("New Chat Started");
//             }}
//             className="flex items-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
//           >
//             <FiPlus className="mr-2" /> New Chat
//           </button>
//         </div>

//         {/* Generate Image toggle */}
//         <div className="p-4 space-y-2 mt-auto">
//           <ToggleButton isOn={generateImageEnabled} onToggle={handleToggle} />
//           {/* <button onClick={handleGenerateImage} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white mt-2">
//             Generate Image Now
//           </button> */}
//         </div>

//         {/* Profile */}
//         {user && (
//           <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg mx-4 mb-4">
//             <img src={user.imageUrl} alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
//             <div>
//               <p className="text-sm font-semibold">{user.fullName}</p>
//               <button onClick={openUserProfile} className="text-xs text-gray-400 hover:text-indigo-400">View Profile</button>
//               <button onClick={() => signOut()} className="block text-xs text-red-400 hover:text-red-500">Sign Out</button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <div className="flex-1 relative">
//           <button onClick={() => scrollContainer("left")} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-gray-100 z-10">
//             <IoIosArrowBack size={20} />
//           </button>

//           <div ref={messageContainerRef} className="flex overflow-x-auto h-full px-6 py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//             {aiModels.map((model) => (
//               <div key={model.id} className="flex-shrink-0 w-full sm:w-96 mx-2 bg-white rounded-lg border border-gray-200 shadow flex flex-col relative">
//                 {/* Header */}
//                 <div className={`${model.color} ${model.textColor} p-3 font-medium flex items-center justify-between`}>
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 rounded-full mr-2 bg-current opacity-70"></div>
//                     {model.name}
//                     {lockedModels[model.id] && <FiLock className="ml-2" size={14} />}
//                   </div>
//                   {isLoading[model.id] && <div className="w-4 h-4 border-t-2 border-r-2 border-current rounded-full animate-spin"></div>}
//                 </div>

//                 {/* Locked overlay */}
//                 {lockedModels[model.id] && (
//                   <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center p-4 z-10 rounded-lg">
//                     <Crown className="mx-auto text-yellow-500" size={40} />
//                     <h3 className="font-bold text-lg mt-2 text-gray-800">Premium Feature</h3>
//                     <p className="text-gray-600 mt-2">{model.upgradeMessage || "Upgrade to unlock this AI model"}</p>
//                     <button onClick={() => navigate("/upgrade")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition">
//                       Upgrade Now
//                     </button>
//                   </div>
//                 )}

//                 {/* Chat messages */}
//                 <div className="chat-scroll flex-1 overflow-y-auto max-h-[400px] p-3 space-y-3">


//                   {(conversations[model.id] || []).map((msg) => (
//                     <div
//                       key={msg.id}
//                       className={`flex ${msg.sender === "user"
//                         ? "justify-end"
//                         : msg.sender === "system"
//                           ? "justify-center items-center"
//                           : "justify-start"
//                         }`}
//                     >
//                       <div
//                         className={`max-w-xs rounded-lg p-3 text-sm relative ${msg.sender === "user"
//                           ? "bg-blue-600 text-white"
//                           : msg.isError
//                             ? "bg-red-100 text-red-700"
//                             : msg.isUpgrade
//                               ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-6 text-center"
//                               : "bg-gray-200 text-gray-800"
//                           }`}
//                       >
//                         {msg.isUpgrade ? (
//                           <div className="text-center">
//                             <Crown className="mx-auto mb-2" size={24} />
//                             <p className="font-semibold mb-1">Premium Feature</p>
//                             <p className="text-sm">{msg.text}</p>
//                             <button className="mt-3 px-3 py-1 bg-white text-purple-600 rounded text-xs font-medium hover:bg-gray-100 transition">
//                               Upgrade Now
//                             </button>
//                           </div>
//                         ) : msg.image ? (
//                           <img src={msg.image} alt="Generated" className="rounded-lg max-w-full h-auto" />
//                         ) : (
//                           <div className="flex justify-between items-start">
//                             <div className="flex-1">
//                               <Markdown>{msg.text}</Markdown>
//                             </div>
//                             <button
//                               onClick={() => handleCopyText(msg.text)}
//                               className="ml-2 text-gray-500 hover:text-gray-900"
//                               title="Copy"
//                             >
//                               📋
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}


//                 </div>
//               </div>
//             ))}
//           </div>

//           <button onClick={() => scrollContainer("right")} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-gray-100 z-10">
//             <IoIosArrowForward size={20} />
//           </button>
//         </div>

//         {/* Input area */}
//         <div className="p-4 border-t border-gray-300 bg-white">
//           <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-2 shadow">
//             <textarea
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder={generateImageEnabled ? "Describe the image to generate…" : "Ask me anything…"}
//               rows={1}
//               className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none resize-none px-3 py-2 min-h-[40px] max-h-32 overflow-y-auto"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   generateImageEnabled ? handleGenerateImage() : handleSendMessage();
//                 }
//               }}
//             />

//             <button onClick={handleEnhanceText} className="p-3 flex items-center justify-center">
//               <Lightbulb size={26} className={`transition-colors ${enhancing ? "text-yellow-400 drop-shadow-[0_0_10px_rgb(250,204,21)]" : "text-gray-500"}`} />
//             </button>

//             <button
//               onClick={generateImageEnabled ? handleGenerateImage : handleSendMessage}
//               disabled={
//                 !inputMessage.trim() ||
//                 (generateImageEnabled ? imageLoading : Object.values(isLoading).some((s) => s))
//               }
//               className={`ml-2 flex items-center justify-center h-10 w-10 rounded-full transition ${inputMessage.trim() &&
//                 !(generateImageEnabled ? imageLoading : Object.values(isLoading).some((s) => s))
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                 }`}
//               type="button"
//               title={generateImageEnabled ? "Generate Image" : "Send"}
//             >
//               {(generateImageEnabled && imageLoading) || (!generateImageEnabled && Object.values(isLoading).some((s) => s)) ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <FiSend />
//               )}
//             </button>








//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AiChatInterface;



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

// ToggleButton component
const ToggleButton = ({ isOn, onToggle }) => (
  <button
    className="flex items-center justify-between w-full sm:w-56 p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors"
    onClick={onToggle}
  >
    <span className="font-medium text-gray-900">Generate Image</span>
    <div
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? "bg-green-500" : "bg-gray-300"
        }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? "translate-x-7" : "translate-x-0"
          }`}
      ></div>
    </div>
  </button>
);

const AiChatInterface = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  const [imageLoading, setImageLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [lockedModels, setLockedModels] = useState({});
  const [generateImageEnabled, setGenerateImageEnabled] = useState(false);
  const messageContainerRef = useRef(null);
  const [enhancing, setEnhancing] = useState(false);

  const { getToken } = useAuth();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navigate = useNavigate();

  const aiModels = [
    { id: "gemini", name: "Gemini Pro", color: "bg-blue-100", textColor: "text-blue-800", endpoint: "/api/googleai/generate-googleai", locked: false },
    { id: "deepseek", name: "DeepSeek", color: "bg-yellow-100", textColor: "text-yellow-700", endpoint: "/api/deepseek/generate-deepseek", locked: false },
    { id: "perplexity", name: "Perplexity.AI", color: "bg-orange-100", textColor: "text-orange-700", locked: true, upgradeMessage: "Upgrade to access Perplexity.AI's advanced capabilities" },
    { id: "grok", name: "Grok", color: "bg-red-100", textColor: "text-red-600", locked: true, upgradeMessage: "Unlock Grok's unique AI with a premium subscription" },
    { id: "claude", name: "Claude", color: "bg-red-100", textColor: "text-red-600", locked: true, upgradeMessage: "Unlock Claude with a premium subscription" },
  ];

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

  const scrollContainer = (direction) => {
    if (messageContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      messageContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  useEffect(() => {
    const chatBoxes = document.querySelectorAll(".chat-scroll");
    chatBoxes.forEach((box) => (box.scrollTop = box.scrollHeight));
  }, [conversations]);

  const handleToggle = () => setGenerateImageEnabled((prev) => !prev);

  // Handle generate image
  const handleGenerateImage = async () => {
    if (!inputMessage.trim()) return toast.error("Please enter a prompt.");
    try {
      setImageLoading(true);
      const token = await getToken();
      const fullPrompt = `Generate an image of ${inputMessage} in the style of Realistic`;
      const { data } = await axios.post(
        "http://localhost:5000/api/genterateimg/generate-img",
        { prompt: fullPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        const firstModelId = aiModels[0].id;
        setConversations((prev) => ({
          ...prev,
          [firstModelId]: [
            ...prev[firstModelId],
            { id: Date.now(), sender: "user", text: inputMessage },
            { id: Date.now() + 1, sender: "ai", image: data.content, ai: aiModels[0].name },
          ],
        }));
        setInputMessage("");
        toast.success("Image generated successfully!");
      } else toast.error(data.message || "Image generation failed.");
    } catch (err) {
      console.error(err);
      toast.error("Error generating image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return toast.error("Please enter a message");
    const newConvos = { ...conversations };
    const newLoading = { ...isLoading };
    aiModels.forEach((m) => {
      if (lockedModels[m.id]) {
        newConvos[m.id] = [
          ...newConvos[m.id],
          { id: Date.now(), sender: "user", text: inputMessage },
          { id: Date.now() + 1, sender: "system", text: m.upgradeMessage || "Upgrade to access this AI model", ai: m.name, isUpgrade: true },
        ];
        newLoading[m.id] = false;
      } else {
        newConvos[m.id] = [...newConvos[m.id], { id: Date.now(), sender: "user", text: inputMessage }];
        newLoading[m.id] = true;
      }
    });
    setConversations(newConvos);
    setIsLoading(newLoading);
    const sentText = inputMessage;
    setInputMessage("");

    const token = await getToken();
    aiModels.forEach(async (model) => {
      if (lockedModels[model.id] || !model.endpoint) return;
      try {
        const { data } = await axios.post(model.endpoint, { prompt: sentText }, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
        const aiText = data?.content || "⚠️ No response from AI";
        setConversations((prev) => ({
          ...prev,
          [model.id]: [...prev[model.id], { id: Date.now() + model.id, sender: "ai", text: aiText, ai: model.name }],
        }));
      } catch (err) {
        console.error(`Error calling ${model.name}:`, err);
        setConversations((prev) => ({
          ...prev,
          [model.id]: [...prev[model.id], { id: Date.now() + model.id, sender: "ai", text: "⚠️ Error fetching response", ai: model.name, isError: true }],
        }));
      } finally {
        setIsLoading((prev) => ({ ...prev, [model.id]: false }));
      }
    });
  };

  const handleEnhanceText = async () => {
    if (!inputMessage.trim()) return toast.error("Please type something to enhance");
    try {
      setEnhancing(true);
      const token = await getToken();
      const { data } = await axios.post("/api/lightup/generate-lightup", { input: inputMessage }, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
      if (data?.output) setInputMessage(data.output) && toast.success("Text enhanced successfully!");
      else toast.error("No response from AI");
    } catch (err) {
      console.error("Error enhancing text:", err);
      toast.error("Failed to enhance text");
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 lg:w-72 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center">
          <FaRobot className="mr-2 text-blue-400" size={24} />
          <h1 className="text-xl font-bold">AI_BattleGround</h1>
        </div>
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
            <FiPlus className="mr-2" /> New Chat
          </button>
        </div>
        <div className="p-4 space-y-2 mt-auto">
          <ToggleButton isOn={generateImageEnabled} onToggle={handleToggle} />
        </div>
        {user && (
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg mx-4 mb-4">
            <img src={user.imageUrl} alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
            <div>
              <p className="text-sm font-semibold">{user.fullName}</p>
              <button onClick={openUserProfile} className="text-xs text-gray-400 hover:text-indigo-400">View Profile</button>
              <button onClick={() => signOut()} className="block text-xs text-red-400 hover:text-red-500">Sign Out</button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative">
          <button onClick={() => scrollContainer("left")} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-gray-100 z-10">
            <IoIosArrowBack size={20} />
          </button>
          <div ref={messageContainerRef} className="flex overflow-x-auto h-full px-4 py-4 sm:px-6 sm:py-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 space-x-4">
            {aiModels.map((model) => (
              <div key={model.id} className="flex-shrink-0 w-full sm:w-80 md:w-96 mx-2 bg-white rounded-lg border border-gray-200 shadow flex flex-col relative">
                {/* Header */}
                <div className={`${model.color} ${model.textColor} p-3 font-medium flex items-center justify-between`}>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-current opacity-70"></div>
                    {model.name}
                    {lockedModels[model.id] && <FiLock className="ml-2" size={14} />}
                  </div>
                  {isLoading[model.id] && <div className="w-4 h-4 border-t-2 border-r-2 border-current rounded-full animate-spin"></div>}
                </div>
                {lockedModels[model.id] && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center p-4 z-10 rounded-lg">
                    <Crown className="mx-auto text-yellow-500" size={40} />
                    <h3 className="font-bold text-lg mt-2 text-gray-800">Premium Feature</h3>
                    <p className="text-gray-600 mt-2">{model.upgradeMessage || "Upgrade to unlock this AI model"}</p>
                    <button onClick={() => navigate("/upgrade")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition">
                      Upgrade Now
                    </button>
                  </div>
                )}
                {/* Chat messages */}
                <div className="chat-scroll flex-1 overflow-y-auto max-h-[400px] p-3 space-y-3">
                  {(conversations[model.id] || []).map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : msg.sender === "system" ? "justify-center items-center" : "justify-start"}`}>
                      <div className={`max-w-xs rounded-lg p-3 text-sm relative ${msg.sender === "user" ? "bg-blue-600 text-white" : msg.isError ? "bg-red-100 text-red-700" : msg.isUpgrade ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-6 text-center" : "bg-gray-200 text-gray-800"}`}>
                        {msg.isUpgrade ? (
                          <div className="text-center">
                            <Crown className="mx-auto mb-2" size={24} />
                            <p className="font-semibold mb-1">Premium Feature</p>
                            <p className="text-sm">{msg.text}</p>
                            <button className="mt-3 px-3 py-1 bg-white text-purple-600 rounded text-xs font-medium hover:bg-gray-100 transition">
                              Upgrade Now
                            </button>
                          </div>
                        ) : msg.image ? (
                          <img src={msg.image} alt="Generated" className="rounded-lg max-w-full h-auto" />
                        ) : (
                          <div className="flex justify-between items-start">
                            <div className="flex-1"><Markdown>{msg.text}</Markdown></div>
                            <button onClick={() => handleCopyText(msg.text)} className="ml-2 text-gray-500 hover:text-gray-900" title="Copy">📋</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollContainer("right")} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-gray-100 z-10">
            <IoIosArrowForward size={20} />
          </button>
        </div>
        {/* Input area */}
        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex flex-col sm:flex-row items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-2 shadow gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={generateImageEnabled ? "Describe the image to generate…" : "Ask me anything…"}
              rows={1}
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none resize-none px-3 py-2 min-h-[40px] max-h-32 overflow-y-auto w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateImageEnabled ? handleGenerateImage() : handleSendMessage();
                }
              }}
            />
            <div className="flex gap-2">
              <button onClick={handleEnhanceText} className="p-3 flex items-center justify-center">
                <Lightbulb size={26} className={`transition-colors ${enhancing ? "text-yellow-400 drop-shadow-[0_0_10px_rgb(250,204,21)]" : "text-gray-500"}`} />
              </button>
              <button
                onClick={generateImageEnabled ? handleGenerateImage : handleSendMessage}
                disabled={!inputMessage.trim() || (generateImageEnabled ? imageLoading : Object.values(isLoading).some((s) => s))}
                className={`flex items-center justify-center h-10 w-10 rounded-full transition ${inputMessage.trim() && !(generateImageEnabled ? imageLoading : Object.values(isLoading).some((s) => s)) ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                title={generateImageEnabled ? "Generate Image" : "Send"}
              >
                {(generateImageEnabled && imageLoading) || (!generateImageEnabled && Object.values(isLoading).some((s) => s)) ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiSend />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;
