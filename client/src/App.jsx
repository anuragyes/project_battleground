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
