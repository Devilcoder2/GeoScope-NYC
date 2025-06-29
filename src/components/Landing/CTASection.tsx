import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Dive into comprehensive population data visualization and discover insights 
              through our advanced mapping platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -20px rgba(0, 212, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Launch Application
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                View Source
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};