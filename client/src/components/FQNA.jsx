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
      <div className="min-h-screen bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                AI Battleground FAQs
              </span>
            </h1>
            <p className="text-lg text-gray-700">
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
                marginBottom: "14px",
                boxShadow: expanded === index ? 5 : 1,
                "&:before": { display: "none" },
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#7e22ce" }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  backgroundColor: expanded === index ? "rgba(255, 192, 203, 0.3)" : "rgba(255, 255, 255, 0.6)",
                  borderRadius: "12px",
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                    color: "#4b0082",
                  },
                }}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "12px",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FQNA;
