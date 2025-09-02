import React from 'react'
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import AIModelsShowcase from './AIModelsShowcase';

const SectionThird = () => {
    return (
        <>
            <section className="relative pt-32 w-full  h-1/6 flex items-center justify-center  bg-gray-900 text-white overflow-hidden">

                {/* Background grid + stars */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
 
                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
                    >
                        Pick <span className="text-white">The Best </span> characteristics <br />

                        of each AI model <br />

                    </motion.h1>


                </div>
            </section>


            <AIModelsShowcase />
        </>
    )
}

export default SectionThird

