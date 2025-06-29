import React from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  size: number;
  delay: number;
  duration: number;
  x: number;
}

export const FloatingBubbles: React.FC = () => {
  const bubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 20,
    delay: Math.random() * 20,
    duration: Math.random() * 20 + 20,
    x: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            background: `linear-gradient(135deg, #00d4ff, #8b5cf6)`,
          }}
          animate={{
            y: [window.innerHeight + bubble.size, -bubble.size],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};