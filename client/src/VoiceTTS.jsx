import React from 'react';

const VoiceTTS= () => {
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language to English
    window.speechSynthesis.speak(utterance);
  };

    const text = "Here’s a short 10-line speech on India’s Independence (1947)Good morning everyone, today I am going to talk about India’s independence.India gained independence from British rule on 15th August 1947.This was a result of years of struggle and sacrifices by freedom fighters.Leaders like Mahatma Gandhi, Jawaharlal Nehru, Sardar Patel, and many others played a vital role."

  return (
    <div>
      <p>{text}</p>
      <button className='border rounded-full bg-amber-400 h-28 w-64' onClick={handleSpeak}>🔊 Listen</button>
    </div>
  );
};

export default VoiceTTS;
