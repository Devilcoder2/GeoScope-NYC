import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-gray-800 bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MapViz Pro</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Advanced geospatial analytics platform for comprehensive population 
              density visualization and analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Features', 'Techstack', 'Explore'].map((link) => (
                <li key={link}>
                  <a href={`#${link}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, href: 'https://github.com/Devilcoder2/GeoScope-NYC' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/ramandeep-singh-3b6560249/' },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 MapViz Pro. Built with passion for geospatial excellence.</p>
        </motion.div>
      </div>
    </footer>
  );
};