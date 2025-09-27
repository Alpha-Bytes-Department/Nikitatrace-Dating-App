import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default first item open

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows returns within 30 days of purchase for unused items with original packaging. Please contact customer support for assistance.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section, where you'll find a tracking link once your order ships.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, American Express, and PayPal for all transactions. Other local payment methods may be available depending on your region.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@example.com or by phone at +1-800-555-1234, available Monday to Friday, 9 AM - 5 PM.",
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center">
        Frequently Asked Questions

      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`shadow rounded-2xl ${
              openIndex === index
                ? "bg-gradient-to-r from-[#4CBF4233] to-[#EBF5EA]"
                : ""
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)} // Toggle or close if same item
              className={`w-full text-left py-4 flex justify-between items-center text-black font-medium focus:outline-none rounded-t-2xl p-10`}
            >
              <span
                className={` ${openIndex === index ? "text-[#236924]" : ""}`}
              >
                {faq.question}
              </span>
              <span
                className={`text-xl w-5 h-5 rounded flex items-center justify-center ${
                  openIndex === index
                    ? "bg-[#4CBF42] text-white"
                    : "bg-gray-200"
                }`}
              >
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div
                className={`py-4 text-gray-700 text-sm sm:text-base  p-10 rounded-b-2xl`}
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
