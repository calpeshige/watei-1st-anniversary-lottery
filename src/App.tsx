import { useState } from 'react';
import type { Prize } from './types';
import { INITIAL_PRIZES, AVAILABLE_COLORS } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { drawPrize, isAllStockEmpty, getNextAvailableColor } from './utils/lottery';
import { playSpinSound, playWinSound, playClickSound, playErrorSound } from './utils/sounds';
import { Garapon3D } from './components/Garapon3D';
import { WinnerDisplay } from './components/WinnerDisplay';
import { PrizeManager } from './components/PrizeManager';
import { Confetti } from './components/Confetti';
import { SakuraPetals } from './components/SakuraPetals';

function App() {
  const [prizes, setPrizes] = useLocalStorage<Prize[]>('garapon-prizes', INITIAL_PRIZES);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  // 抽選実行
  const handleSpin = () => {
    if (isSpinning || isAllStockEmpty(prizes)) {
      playErrorSound();
      return;
    }

    playClickSound();
    setIsSpinning(true);
    setWinner(null);
    setShowWinner(false);
    setTriggerConfetti(false);

    // 回転音を再生
    playSpinSound(3000);

    // 3秒後に結果表示
    setTimeout(() => {
      const result = drawPrize(prizes);

      if (result) {
        // 在庫を減らす
        setPrizes(prev =>
          prev.map(p => (p.id === result.id ? { ...p, stock: p.stock - 1 } : p))
        );

        setWinner(result);
        setIsSpinning(false);

        // 少し待ってから結果表示
        setTimeout(() => {
          setShowWinner(true);
          setTriggerConfetti(true);

          // レア度に応じた効果音
          if (result.color === 'gold') {
            playWinSound('super-rare');
          } else if (result.color === 'silver' || result.color === 'bronze') {
            playWinSound('rare');
          } else {
            playWinSound('common');
          }
        }, 500);
      } else {
        setIsSpinning(false);
        playErrorSound();
      }
    }, 3000);
  };

  // 景品を更新
  const handleUpdatePrize = (id: string, updates: Partial<Prize>) => {
    setPrizes(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  // 景品を追加
  const handleAddPrize = () => {
    const usedColors = prizes.map(p => p.color);
    const nextColor = getNextAvailableColor(usedColors, AVAILABLE_COLORS);

    if (!nextColor) return;

    const newPrize: Prize = {
      id: Date.now().toString(),
      color: nextColor.color as any,
      name: `景品（${nextColor.name}）`,
      stock: 10,
      probability: 5,
      colorHex: nextColor.hex,
    };

    setPrizes(prev => [...prev, newPrize]);
    playClickSound();
  };

  // 景品を削除
  const handleRemovePrize = (id: string) => {
    if (prizes.length <= 1) {
      playErrorSound();
      return;
    }
    setPrizes(prev => prev.filter(p => p.id !== id));
    playClickSound();
  };

  // リセット
  const handleReset = () => {
    if (window.confirm('本当にリセットしますか？すべての在庫が初期値に戻ります。')) {
      setPrizes(INITIAL_PRIZES);
      setWinner(null);
      setShowWinner(false);
      playClickSound();
    }
  };

  // 管理画面を開く
  const handleOpenManager = () => {
    playClickSound();
    setShowManager(true);
  };

  const allStockEmpty = isAllStockEmpty(prizes);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 桜の花びら - 降るアニメーション */}
      <SakuraPetals />

      {/* ヘッダー - のれん風 */}
      <header className="relative z-10 py-6 bg-gradient-to-b from-red-900/30 to-transparent border-b-4 border-yellow-700">
        {/* 縄暖簾の装飾 */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-yellow-800 to-yellow-900 border-t-2 border-yellow-600">
          <div className="absolute inset-0 flex justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1 h-full bg-gradient-to-b from-yellow-700 to-yellow-900" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-display font-black text-center text-yellow-100 mb-2" style={{
            textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(220, 20, 60, 0.7)',
            fontFamily: "'Zen Maru Gothic', sans-serif"
          }}>
            和亭1周年記念抽選会
          </h1>
          <p className="text-center text-yellow-200/90 text-lg tracking-[0.5em] font-bold" style={{
            fontFamily: "'Zen Maru Gothic', sans-serif"
          }}>
            〜 総額35万円還元 〜
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* 操作ボタン */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={handleSpin}
            disabled={isSpinning || allStockEmpty}
            className="premium-button text-2xl px-16 py-6 font-display"
          >
            {isSpinning ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-5 h-5 border-2 border-yellow-100 border-t-transparent rounded-full animate-spin" />
                回転中
              </span>
            ) : allStockEmpty ? (
              '完売御礼'
            ) : (
              '抽選開始'
            )}
          </button>
        </div>

        {/* 景品一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {prizes.map(prize => (
            <div
              key={prize.id}
              className="prize-card p-4 text-center"
            >
              {/* メタリック玉 */}
              <div className="relative w-16 h-16 rounded-full mx-auto mb-3">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${prize.colorHex}, ${prize.colorHex}dd)`,
                    boxShadow: `
                      0 0 15px ${prize.colorHex}66,
                      inset -2px -2px 6px rgba(0,0,0,0.3),
                      inset 2px 2px 6px rgba(255,255,255,0.4)
                    `,
                  }}
                >
                  <div className="absolute top-[25%] left-[30%] w-4 h-4 rounded-full bg-white/30 blur-sm" />
                </div>
              </div>

              <p className="font-bold text-sm text-gray-800 truncate">{prize.name}</p>
            </div>
          ))}
        </div>

        {/* 管理ボタン */}
        <div className="flex justify-center gap-4 max-w-2xl mx-auto">
          <button
            onClick={handleOpenManager}
            className="flex-1 glass-card px-6 py-3 text-base font-bold text-gray-800 hover:bg-white/20 transition-colors"
          >
            景品管理
          </button>
          <button
            onClick={handleReset}
            className="flex-1 glass-card px-6 py-3 text-base font-bold text-gray-800 hover:bg-white/20 transition-colors"
          >
            リセット
          </button>
        </div>
      </main>

      {/* 当選表示 */}
      {showWinner && winner && (
        <WinnerDisplay winner={winner} onClose={() => setShowWinner(false)} />
      )}

      {/* 景品管理画面 */}
      {showManager && (
        <PrizeManager
          prizes={prizes}
          onUpdatePrize={handleUpdatePrize}
          onAddPrize={handleAddPrize}
          onRemovePrize={handleRemovePrize}
          onClose={() => {
            setShowManager(false);
            playClickSound();
          }}
        />
      )}

      {/* 紙吹雪 */}
      <Confetti trigger={triggerConfetti} color={winner?.colorHex} />

      {/* ガラポン抽選機（全画面表示） */}
      <Garapon3D isSpinning={isSpinning} winner={winner} prizes={prizes} />
    </div>
  );
}

export default App;
