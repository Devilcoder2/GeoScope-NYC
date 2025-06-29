import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Play } from 'lucide-react';
import PreviewImage from "../assets/Preview.png"// Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {

  const navigate = useNavigate();

  const exploreMapsHandler = () => {
    navigate('/dashboard');
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-20 text-center max-w-6xl mx-auto">
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
            🗺️ Advanced GeoSpatial Analytics Platform
          </span>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl mt-10 md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent leading-tight"
        >
          Interactive
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Population
          </span>
          <br />
          Mapping
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Explore comprehensive US population density data through cutting-edge 
          interactive maps powered by OpenLayers and GeoJSON technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -20px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={exploreMapsHandler}
            className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center gap-2"
          >
            Explore Maps
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://github.com/Devilcoder2/GeoScope-NYC", "_blank")}
            className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center gap-2"
          >
             <Github className="w-5 h-5" />
              View Source
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-400 text-sm">MapViz Pro Dashboard</span>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  {/* <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🗺️</span>
                  </div> */}
                  <p className="text-gray-400 w-96">
                    <img src={PreviewImage} alt="MapViz Pro Preview" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};