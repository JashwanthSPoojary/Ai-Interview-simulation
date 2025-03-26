"use client";

import { motion } from "framer-motion";
import HeaderBackgroundWrapper from "./HeaderBackgroundWrapper";
import Link from "next/link";
export default function Header() {
  return (
    <HeaderBackgroundWrapper>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} // Header appears after Navbar
        className="w-full py-12 md:py-24 lg:py-32"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Just upload resume AI creates interview for you
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true }}
                className="mx-auto max-w-[700px] text-gray-700 md:text-xl"
              >
                Upload your resume, see a modifiable preview, set interview duration,
                and get AI feedback on your answers.
              </motion.p>
            </div>

            {/* Animated Button */}
            <Link href="/interview/setup">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              className="relative inline-flex h-14 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-500%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_40%,#E2CBFF_80%)] blur-md opacity-70" />
              <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-lg font-semibold text-white backdrop-blur-3xl">
                Take the Interview
              </span>
            </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </HeaderBackgroundWrapper>
  );
}
