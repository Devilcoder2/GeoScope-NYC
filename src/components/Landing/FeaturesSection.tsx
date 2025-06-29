import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from './FeatureCard';
import {
  Map,
  Users,
  Filter,
  Download,
  Shield,
  Layers,
  MousePointer,
  Maximize,
  PenTool,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Map,
      title: "GeoJSON Mapping",
      description: "Advanced OpenLayers integration displaying comprehensive US population density data with interactive visualization capabilities."
    },
    {
      icon: BarChart3,
      title: "Dynamic Legend",
      description: "Intelligent legend system that adapts to data ranges, providing clear visual representation of population density metrics."
    },
    {
      icon: MousePointer,
      title: "Smart Tooltips",
      description: "Contextual information display on hover, revealing detailed population statistics and demographic insights."
    },
    {
      icon: Shield,
      title: "User Authentication",
      description: "Secure login and logout functionality with session management and user preference storage capabilities."
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Powerful filtering system allowing users to explore data based on custom population density criteria and ranges."
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Loading animations and optimized rendering ensuring smooth user experience even with large datasets."
    },
    {
      icon: Download,
      title: "Map Export",
      description: "High-quality PNG export functionality allowing users to save and share their customized map visualizations."
    },
    {
      icon: Globe,
      title: "AWS Deployment",
      description: "Scalable cloud infrastructure with CI/CD pipeline ensuring reliable performance and continuous deployment."
    },
    {
      icon: Maximize,
      title: "Fullscreen Mode",
      description: "Immersive fullscreen experience for detailed map exploration and comprehensive data analysis."
    },
    {
      icon: PenTool,
      title: "Drawing Tools",
      description: "Interactive geometry creation with support for points, polygons, and circles for custom area analysis."
    },
    {
      icon: Layers,
      title: "Overview Maps",
      description: "Toggleable overview functionality providing spatial context and enhanced navigation capabilities."
    },
    {
      icon: Users,
      title: "Responsive Design",
      description: "Seamless experience across all devices with adaptive layouts optimized for mobile and desktop platforms."
    }
  ];

  return (
    <section className="relative py-24 px-4" id='Features'>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive mapping solution built with cutting-edge technologies 
            and designed for professional geospatial analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};