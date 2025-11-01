import { motion, AnimatePresence } from 'framer-motion';
import type { Prize } from '../types';

interface WinnerDisplayProps {
  winner: Prize | null;
  onClose: () => void;
}

export function WinnerDisplay({ winner, onClose }: WinnerDisplayProps) {
  if (!winner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative"
          onClick={e => e.stopPropagation()}
        >
          {/* 発光エフェクト */}
          <motion.div
            className="absolute inset-0 rounded-3xl blur-3xl"
            style={{ backgroundColor: winner.colorHex }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* メインカード */}
          <div className="relative bg-japanese-paper rounded-3xl shadow-2xl p-12 border-8 border-japanese-wood max-w-2xl">
            {/* 閉じるボタン */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              aria-label="閉じる"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 当選文字 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 px-12 py-4 rounded-xl border-4 border-yellow-500 shadow-2xl">
                <h2 className="text-6xl font-black text-yellow-100 tracking-wider" style={{
                  textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
                  fontFamily: "'Zen Maru Gothic', sans-serif"
                }}>
                  当選
                </h2>
              </div>
            </motion.div>

            {/* 玉の表示 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center text-6xl font-black shadow-2xl"
                style={{
                  backgroundColor: winner.colorHex,
                  border: '8px solid white',
                  boxShadow: `0 0 40px ${winner.colorHex}, 0 0 80px ${winner.colorHex}`,
                }}
              >
                <span className="text-white" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
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
              </div>
            </motion.div>

            {/* 景品名 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border-4 border-amber-300">
                <p className="text-5xl font-black text-gray-900 mb-2" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.15)' }}>
                  {winner.name}
                </p>
                <p className="text-2xl text-gray-800 font-bold mt-4">
                  おめでとうございます
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
