import { motion } from 'framer-motion';
import type { Prize } from '../types';

interface GaraponProps {
  isSpinning: boolean;
  winner: Prize | null;
}

export function Garapon({ isSpinning, winner }: GaraponProps) {
  return (
    <div className="garapon-container w-full h-[500px] relative">
      {/* 背景グロー */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
          }}
          animate={
            isSpinning
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* メインガラポン */}
      <motion.div
        className="relative w-96 h-96 mx-auto z-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={
          isSpinning
            ? {
                rotateY: [0, 360],
                rotateZ: [0, 360],
              }
            : {}
        }
        transition={
          isSpinning
            ? {
                duration: 5,
                ease: 'easeInOut',
              }
            : {}
        }
      >
        {/* ガラスドーム（外側） */}
        <div className="absolute inset-0 rounded-full backdrop-blur-md bg-gradient-to-br from-white/20 via-white/10 to-white/5 border-4 border-white/30 shadow-glow-lg overflow-hidden">
          {/* ガラス反射エフェクト */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60" />
          <div className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full bg-white/20 blur-2xl" />

          {/* 内部の玉たち */}
          <div className="absolute inset-8 rounded-full overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#DC143C', '#2E8B57'];
              const color = colors[Math.floor(Math.random() * 5)];
              const size = 20 + Math.random() * 16;

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full shadow-lg"
                  style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)`,
                    boxShadow: `
                      0 0 ${size/2}px ${color}66,
                      inset -2px -2px 8px rgba(0,0,0,0.3),
                      inset 2px 2px 8px rgba(255,255,255,0.5)
                    `,
                    left: `${Math.random() * 80}%`,
                    top: `${Math.random() * 80}%`,
                  }}
                  animate={
                    isSpinning
                      ? {
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                          scale: [1, 0.9, 1],
                          rotate: [0, 360],
                        }
                      : {
                          y: [0, -5, 0],
                        }
                  }
                  transition={
                    isSpinning
                      ? {
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: i * 0.05,
                        }
                      : {
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }
                  }
                />
              );
            })}
          </div>

          {/* ガラス表面のハイライト */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
            }}
            animate={
              isSpinning
                ? {
                    opacity: [0.3, 0.6, 0.3],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* 中央の回転軸（プレミアムデザイン） */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 shadow-glow"
            style={{
              boxShadow: '0 0 30px rgba(255,215,0,0.6), inset 0 4px 8px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.2)',
            }}
            animate={
              isSpinning
                ? {
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-transparent via-white/20 to-transparent" />
          </motion.div>
        </div>

        {/* 装飾リング */}
        <div className="absolute inset-[-8px] rounded-full border-2 border-gold-400/30 animate-spin-slow" />
        <div className="absolute inset-[-16px] rounded-full border border-gold-500/20" style={{ animationDirection: 'reverse' }} />
      </motion.div>

      {/* ベース/台座（3D効果） */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 z-0">
        <div className="relative">
          {/* 台座本体 */}
          <div className="h-24 bg-gradient-to-b from-wabi-slate via-wabi-charcoal to-wabi-ink rounded-b-3xl shadow-float border-t-4 border-gold-500/20">
            {/* 装飾ライン */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

            {/* グローエフェクト */}
            <motion.div
              className="absolute inset-0 rounded-b-3xl"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(255,215,0,0.1) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* 出口スロット */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2">
            <div className="w-32 h-20 bg-gradient-to-b from-wabi-charcoal to-wabi-ink rounded-b-2xl border-2 border-gold-500/30 shadow-xl overflow-hidden">
              {/* 内部グロー */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gold-500/20 to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 当選玉の表示（劇的演出） */}
      {winner && !isSpinning && (
        <motion.div
          initial={{ scale: 0, y: -100, opacity: 0, rotateZ: -180 }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
            rotateZ: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 12,
            delay: 0.2,
          }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-32 z-20"
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* グローオーラ */}
            <motion.div
              className="absolute inset-[-20px] rounded-full blur-2xl"
              style={{
                backgroundColor: winner.colorHex,
                opacity: 0.4,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* 玉本体 */}
            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${winner.colorHex}ff, ${winner.colorHex}dd, ${winner.colorHex}99)`,
                border: '4px solid rgba(255,255,255,0.8)',
                boxShadow: `
                  0 0 40px ${winner.colorHex}aa,
                  0 0 80px ${winner.colorHex}66,
                  inset -4px -4px 12px rgba(0,0,0,0.4),
                  inset 4px 4px 12px rgba(255,255,255,0.6)
                `,
              }}
            >
              <span
                className="text-white neon-text relative z-10"
                style={{
                  textShadow: `
                    0 0 10px rgba(255,255,255,0.8),
                    2px 2px 8px rgba(0,0,0,0.8),
                    0 0 20px ${winner.colorHex}
                  `,
                }}
              >
                {winner.color === 'gold' && '金'}
                {winner.color === 'silver' && '銀'}
                {winner.color === 'bronze' && '銅'}
                {winner.color === 'red' && '赤'}
                {winner.color === 'green' && '緑'}
                {winner.color === 'purple' && '紫'}
                {winner.color === 'blue' && '青'}
                {winner.color === 'orange' && '橙'}
                {winner.color === 'pink' && '桃'}
                {winner.color === 'cyan' && '水'}
                {winner.color === 'yellow' && '黄'}
              </span>

              {/* ハイライト */}
              <div className="absolute top-[20%] left-[30%] w-12 h-12 rounded-full bg-white/40 blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* パーティクルエフェクト（回転中） */}
      {isSpinning && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-gold-400/60"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 400],
                y: [0, (Math.random() - 0.5) * 400],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
