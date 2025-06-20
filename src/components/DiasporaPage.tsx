import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DiasporaForm from "./DiasporaForm";
import DiasporaList from "./DiasporaList";
import CommunityBoard from "./CommunityBoard";
import axios from "axios";

type Member = {
  _id: string;
  fullName: string;
  email: string;
  country: string;
  interests: string[];
  message: string;
  createdAt: string;
};

import type { Variants, Easing } from "framer-motion";

const easeOut: Easing = [0.42, 0, 0.58, 1];

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, ease: easeOut },
  }),
};

const DiasporaPage = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get<Member[]>(
        "http://localhost:5000/api/diaspora"
      );
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to fetch diaspora members", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen md:flex">
      {/* Sidebar: stack on small, fixed on medium+ */}
      <aside className="w-full md:w-[280px] bg-white shadow-lg p-4  md:fixed md:top-0 md:left-0 md:h-[calc(100vh-64px)] z-10 overflow-y-auto">
        <DiasporaForm onSubmitSuccess={fetchMembers} />
      </aside>

      {/* Main Content */}
      <main className="p-4 md:ml-[280px] md:pt-20 w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-extrabold text-blue-900 text-center"
        >
          🌍 Ethiopian Diaspora Community Hub
        </motion.h1>

        {/* Recent Members */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          custom={0}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <AnimatePresence>
            <DiasporaList members={members} />
          </AnimatePresence>
        </motion.section>

        {/* Community Board */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          custom={1}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <CommunityBoard />
        </motion.section>
      </main>
    </div>
  );
};

export default DiasporaPage;
