import React from 'react';
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import SectionThird from './SectionThird';
import Pricing from './Pricing';

const SectionSecond = () => {
  const text = "Limited time: Save 90% compared to individual subscriptions";

  return (
    <>
    

      <Pricing />
      <SectionThird />
    </>
  )
}

export default SectionSecond;
