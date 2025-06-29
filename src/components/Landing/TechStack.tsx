import React from 'react';
import { motion } from 'framer-motion';

export const TechStack: React.FC = () => {
  const technologies = [
    { name: 'React', color: 'from-blue-400 to-cyan-400' },
    { name: 'TypeScript', color: 'from-blue-600 to-blue-400' },
    { name: 'OpenLayers', color: 'from-green-400 to-emerald-400' },
    { name: 'TailwindCSS', color: 'from-cyan-400 to-teal-400' },
    { name: 'Framer Motion', color: 'from-purple-400 to-pink-400' },
    { name: 'AWS S3', color: 'from-orange-400 to-red-400' },
    { name: 'GitHub Actions', color: 'from-gray-600 to-gray-400' },
    { name: 'GeoJSON', color: 'from-indigo-400 to-purple-400' },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Built with Modern Tech
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Leveraging industry-leading technologies for performance, scalability, and reliability
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 20px 40px -20px rgba(255, 255, 255, 0.1)",
              }}
              className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent font-bold text-lg px-6 py-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-gray-600 transition-all duration-300 cursor-default`}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};