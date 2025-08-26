import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AiChatInterface from './components/AiChatInterface'
import Pricing from './components/Pricing'
import FQNA from './components/FQNA'
import ModelPreferencesCard from './components/ModelPreferencedCard'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import AIModelsShowcase from './components/AIModelsShowcase'
import { useAuth } from '@clerk/clerk-react'

const App = () => {
  const location = useLocation();

  // check if current route is /ai
  const isAiRoute = location.pathname === "/ai";

  const { getToken } = useAuth();



  useEffect(() => {
    // Using async function inside useEffect
    const fetchToken = async () => {

      const token = await getToken();
      console.log("Token:", token);

    };

    fetchToken();
  }, [getToken]);


  return (
    <>
      <Toaster />

      {/* Show Navbar only if NOT on /ai */}
      {!isAiRoute && <Navbar />}

      <div className={isAiRoute ? "pt-0" : "pt-1"}>
        <Routes>
          <Route path="/ai" element={<AiChatInterface />} />
          <Route path="/" element={<HeroSection />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/Fqa" element={<FQNA />} />
          <Route path="/about" element={<AIModelsShowcase />} />
          <Route path="/ModelPreference" element={<ModelPreferencesCard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;









// import React, { useState } from "react";
// import axios from "axios";

// export default function App() {
//   const [prompt, setPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!prompt) return;
//     setLoading(true);
//     try {
//       const { data } = await axios.post("http://localhost:5000/generate-image", { prompt });
//       if (data.success) {
//         setImageUrl(data.url);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error generating image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Text-to-Image Generator</h1>
//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter prompt"
//         style={{ width: 300, marginRight: 10 }}
//       />
//       <button onClick={handleGenerate} disabled={loading}>
//         {loading ? "Generating..." : "Generate"}
//       </button>
//       {imageUrl && (
//         <div style={{ marginTop: 20 }}>
//           <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%" }} />
//         </div>
//       )}
//     </div>
//   );
// }
