import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Prize } from '../types';

interface Garapon3DProps {
  isSpinning: boolean;
  winner: Prize | null;
  prizes: Prize[];
}

// ビンゴ回転式抽選機コンポーネント（2D）
function BingoMachine({ isSpinning, winner, prizes }: { isSpinning: boolean; winner: Prize | null; prizes: Prize[] }) {
  const [rotation, setRotation] = useState(0);
  const [showWinnerBall, setShowWinnerBall] = useState(false);

  useEffect(() => {
    if (!isSpinning) {
      setRotation(0);
      return;
    }

    // 3秒で1回転（360度）- コマ送り風
    const totalSteps = 36; // 36ステップ = 10度ずつ
    const stepDuration = 3000 / totalSteps; // 各ステップの時間
    let currentStep = 0;

    setRotation(0);

    const interval = setInterval(() => {
      currentStep++;
      const newRotation = (currentStep / totalSteps) * 360;
      setRotation(newRotation);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setRotation(360);
      }
    }, stepDuration);

    return () => {
      clearInterval(interval);
    };
  }, [isSpinning]);

  useEffect(() => {
    if (winner && !isSpinning) {
      setTimeout(() => setShowWinnerBall(true), 700);
    } else {
      setShowWinnerBall(false);
    }
  }, [winner, isSpinning]);

  // 在庫のある景品から玉を生成
  const balls = prizes
    .filter(p => p.stock > 0)
    .flatMap(prize =>
      Array.from({ length: Math.min(prize.stock, 10) }, (_, i) => ({
        id: `${prize.id}-${i}`,
        color: prize.colorHex,
        label: prize.color === 'gold' ? '金' :
               prize.color === 'silver' ? '銀' :
               prize.color === 'bronze' ? '銅' :
               prize.color === 'red' ? '赤' :
               prize.color === 'green' ? '緑' :
               prize.color === 'purple' ? '紫' :
               prize.color === 'blue' ? '青' :
               prize.color === 'orange' ? '橙' :
               prize.color === 'pink' ? '桃' :
               prize.color === 'cyan' ? '水' : '黄',
        angle: Math.random() * 360,
        distance: 60 + Math.random() * 80,
      }))
    );

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 600 600" className="w-full h-full">
        {/* 外枠ドラム */}
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke="#8B4513"
          strokeWidth="8"
          opacity="0.8"
        />
        <circle
          cx="300"
          cy="300"
          r="230"
          fill="rgba(139, 69, 19, 0.1)"
          stroke="#DEB887"
          strokeWidth="4"
        />

        {/* 回転する玉たち */}
        <g transform={`rotate(${rotation} 300 300)`}>
          {balls.map((ball) => {
            const x = 300 + Math.cos((ball.angle * Math.PI) / 180) * ball.distance;
            const y = 300 + Math.sin((ball.angle * Math.PI) / 180) * ball.distance;

            return (
              <g key={ball.id}>
                {/* 玉の影 */}
                <circle
                  cx={x + 2}
                  cy={y + 2}
                  r="18"
                  fill="rgba(0,0,0,0.3)"
                />
                {/* 玉本体 */}
                <circle
                  cx={x}
                  cy={y}
                  r="18"
                  fill={ball.color}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />
                {/* 玉のハイライト */}
                <circle
                  cx={x - 5}
                  cy={y - 5}
                  r="6"
                  fill="rgba(255,255,255,0.5)"
                />
              </g>
            );
          })}
        </g>

        {/* 回転の目印（固定） */}
        <g>
          {/* 上部の目印 */}
          <rect
            x="290"
            y="40"
            width="20"
            height="15"
            fill="#FFD700"
            stroke="#8B4513"
            strokeWidth="2"
          />
          <text
            x="300"
            y="52"
            fontSize="10"
            fontWeight="bold"
            fill="#8B4513"
            textAnchor="middle"
          >
            ▼
          </text>
        </g>

        {/* 中央の軸 */}
        <circle
          cx="300"
          cy="300"
          r="30"
          fill="#8B4513"
          stroke="#DEB887"
          strokeWidth="3"
        />
        <circle
          cx="295"
          cy="295"
          r="12"
          fill="rgba(255,255,255,0.3)"
        />

        {/* 軸の回転目印（回転する） */}
        <g transform={`rotate(${rotation} 300 300)`}>
          <line
            x1="300"
            y1="300"
            x2="300"
            y2="260"
            stroke="#FFD700"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* 当選玉が出てくる演出 */}
      {showWinnerBall && winner && (
        <motion.div
          initial={{ y: -150, opacity: 0, scale: 0 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 0.3
          }}
          className="absolute"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${winner.colorHex}, ${winner.colorHex}dd)`,
              boxShadow: `
                0 0 60px ${winner.colorHex}aa,
                inset -5px -5px 15px rgba(0,0,0,0.4),
                inset 5px 5px 15px rgba(255,255,255,0.5)
              `,
              border: '4px solid rgba(255,255,255,0.8)'
            }}
          >
            <span className="text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
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
      )}
    </div>
  );
}

export function Garapon3D({ isSpinning, winner, prizes }: Garapon3DProps) {
  return (
    <>
      {/* 抽選中の全画面表示のみ */}
      {isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-[90vw] h-[90vh] flex items-center justify-center">
            <BingoMachine isSpinning={isSpinning} winner={winner} prizes={prizes} />
          </div>
        </motion.div>
      )}
    </>
  );
}
