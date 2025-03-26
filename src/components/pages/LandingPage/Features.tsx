"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Brain, Clock, MessageSquare, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function Features() {
  const features = [
    { icon: FileText, title: "Resume Analysis", desc: "Upload your resume and our AI will extract key information to create a personalized interview experience." },
    { icon: Brain, title: "Smart Question Generation", desc: "Our AI generates tailored interview questions based on your skills, experience, and the job you're targeting." },
    { icon: Clock, title: "Timed Simulations", desc: "Practice with realistic interview simulations that include time countdowns to help you prepare for the real thing." },
    { icon: MessageSquare, title: "Interactive Feedback", desc: "Receive detailed feedback on your answers, communication style, and areas for improvement after each simulation." },
      ];

  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto max-w-5xl px-6 md:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 md:p-8 rounded-lg border border-gray-300 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="mb-5">
                <feature.icon className="h-10 w-10 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {feature.desc}
              </p>
              <Link
                href="/interview/setup"
                className="inline-flex items-center text-gray-900 font-semibold text-base"
              >
                Try it out <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
