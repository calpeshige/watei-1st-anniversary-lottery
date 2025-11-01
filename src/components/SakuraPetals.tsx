import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // 桜の花びらを生成
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100%
      delay: Math.random() * 10, // 0-10秒
      duration: 15 + Math.random() * 10, // 15-25秒
      size: 8 + Math.random() * 6, // 8-14px
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-10%',
          }}
          animate={{
            top: '110%',
            x: [0, 30, -20, 40, 0],
            rotate: [0, 180, 360, 540, 720],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              background: `radial-gradient(ellipse at 30% 30%,
                rgba(255, 192, 203, 0.9) 0%,
                rgba(255, 182, 193, 0.7) 40%,
                rgba(255, 192, 203, 0.5) 70%,
                transparent 100%)`,
              borderRadius: '50% 0 50% 0',
              boxShadow: '0 2px 4px rgba(255, 182, 193, 0.3)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
