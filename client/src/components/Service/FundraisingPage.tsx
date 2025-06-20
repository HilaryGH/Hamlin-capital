import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FundraisingPage: React.FC = () => {
  return (
    <>
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-bold text-blue-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fundraising Solutions
          </motion.h1>

          <motion.p
            className="mb-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            At Hamlin Capital, we provide strategic fundraising services
            tailored to meet the financial and operational needs of growing
            businesses. Our goal is to ensure sustainable access to capital that
            fuels expansion, innovation, and long-term success.
          </motion.p>

          <motion.ul
            className="list-disc pl-6 space-y-4 text-gray-700"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <strong>Equity Fundraising:</strong> We design and execute
              customized equity fundraising strategies to help businesses
              attract investors who align with their vision.
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <strong>Debt Financing:</strong> We help clients structure debt
              solutions including corporate loans, bonds, and mezzanine
              financing.
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <strong>Investor Positioning:</strong> We craft compelling
              investment cases and narratives.
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <strong>Deal Structuring & Negotiation:</strong> Our experts
              assist in structuring win-win fundraising deals.
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <strong>Compliance & Due Diligence Support:</strong> We guide
              businesses through regulatory and documentation requirements.
            </motion.li>
          </motion.ul>

          <motion.p
            className="mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Whether you're raising capital to launch a new product, enter a new
            market, or restructure your balance sheet, Hamlin Capital is your
            trusted partner every step of the way.
          </motion.p>
        </div>
      </section>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/service" className="text-blue-700 hover:underline">
          ← Back to All Services
        </Link>
      </motion.div>
    </>
  );
};

export default FundraisingPage;
