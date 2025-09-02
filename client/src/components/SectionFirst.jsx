import React from 'react';
import SectionSecond from './SectionSecond';
import VideoYT from './VideoYT';

const SectionFirst = () => {
  return (
    <>
      <section className="w-full bg-gradient-to-br from-gray-950 to-gray-800 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
            One Window. Six Perspectives. <br className="hidden md:block" />
            Achieve Optimal Efficiency.
          </h2>
  
          {/* Subtext */}
          <p className="mt-4 text-gray-400 text-sm md:text-base lg:text-lg">
            Every feature is designed to amplify your AI-powered productivity
          </p>
        </div>
      </section>

      <VideoYT />
      <SectionSecond />
    </>
  );
}

export default SectionFirst;
