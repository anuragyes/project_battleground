import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "./Footer";

const FQNA = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "How is AI Battleground better than separate AI subscriptions?",
      answer:
        "One platform, all top AIs. Save 40% vs individual subscriptions. Compare responses instantly. Single interface. No juggling multiple accounts.",
    },
    {
      question: "Can I choose specific AI models?",
      answer:
        "Yes! Select manually or use Smart Router that auto-chooses the best AI for writing, coding, or research tasks.",
    },
    {
      question: "Are messages unlimited?",
      answer:
        "400K tokens/month starter plan covers most needs. Tokens work across all models, more flexible than message limits.",
    },
    {
      question: "What if I exceed my token limit?",
      answer:
        "Auto-switch to pay-as-you-go or upgrade instantly. Get alerts at 75%, 90%, and 100% usage.",
    },
  ];

  return (
   <>
   
   
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              AI Battleground FAQs
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Quick answers about your ultimate AI toolkit
          </p>
        </div>

        {/* Accordion */}
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              borderRadius: "12px",
              marginBottom: "12px",
              boxShadow: expanded === index ? 3 : 1,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                backgroundColor: expanded === index ? "#fff5f5" : "#fafafa",
                borderRadius: "12px",
              }}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>


    <Footer/>
   
   
   </>
  );
};

export default FQNA;
