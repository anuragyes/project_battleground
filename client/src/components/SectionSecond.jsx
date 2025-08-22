import React from 'react';
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import SectionThird from './SectionThird';
import Pricing from './Pricing';

const SectionSecond = () => {
  const text = "Limited time: Save 90% compared to individual subscriptions";

  return (
    <>
      <section className="relative h-72 flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-900 text-white overflow-hidden">
        {/* Content */}
        <div className="relative z-10 text-center px-4">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Get <span className="text-white">6 Premium AI Models</span> <br />
            for Half the Price of One
          </motion.h1>

          {/* Firewave Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 inline-flex items-center gap-2 bg-black border border-green-500 rounded-full px-4 py-2 text-sm sm:text-base"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="firewave-text font-bold">
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </div>
      </section>

      <Pricing />
      <SectionThird />
    </>
  )
}

export default SectionSecond;
