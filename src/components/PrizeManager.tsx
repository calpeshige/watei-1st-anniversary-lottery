import type { Prize } from '../types';
import { AVAILABLE_COLORS } from '../types';
import { getNextAvailableColor } from '../utils/lottery';
import { motion } from 'framer-motion';

interface PrizeManagerProps {
  prizes: Prize[];
  onUpdatePrize: (id: string, updates: Partial<Prize>) => void;
  onAddPrize: () => void;
  onRemovePrize: (id: string) => void;
  onClose: () => void;
}

export function PrizeManager({
  prizes,
  onUpdatePrize,
  onAddPrize,
  onRemovePrize,
  onClose,
}: PrizeManagerProps) {
  const usedColors = prizes.map(p => p.color);
  const canAddMore = usedColors.length < AVAILABLE_COLORS.length;
  const nextColor = getNextAvailableColor(usedColors, AVAILABLE_COLORS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-japanese-paper rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
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

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-japanese-red to-red-700 text-white p-6">
          <h2 className="text-3xl font-bold text-center">景品管理</h2>
        </div>

        {/* コンテンツ */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* 在庫状況サマリー */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300">
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">在庫状況</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border-2 border-blue-400 px-4 py-2 text-gray-900 font-bold">色</th>
                    <th className="border-2 border-blue-400 px-4 py-2 text-gray-900 font-bold">景品名</th>
                    <th className="border-2 border-blue-400 px-4 py-2 text-gray-900 font-bold">残数</th>
                    <th className="border-2 border-blue-400 px-4 py-2 text-gray-900 font-bold">確率</th>
                  </tr>
                </thead>
                <tbody>
                  {prizes.map(prize => (
                    <tr key={prize.id} className="bg-white hover:bg-blue-50 transition-colors">
                      <td className="border-2 border-blue-300 px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full shadow-md"
                            style={{ backgroundColor: prize.colorHex }}
                          />
                        </div>
                      </td>
                      <td className="border-2 border-blue-300 px-4 py-2 text-gray-900 font-bold">{prize.name}</td>
                      <td className="border-2 border-blue-300 px-4 py-2 text-center">
                        <span className="text-2xl font-black text-gray-900">{prize.stock}</span>
                      </td>
                      <td className="border-2 border-blue-300 px-4 py-2 text-center text-gray-900 font-bold">
                        {prize.probability.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-200 font-black">
                    <td colSpan={2} className="border-2 border-blue-400 px-4 py-3 text-right text-gray-900 text-lg">
                      総残数
                    </td>
                    <td className="border-2 border-blue-400 px-4 py-3 text-center">
                      <span className="text-3xl font-black text-red-700">
                        {prizes.reduce((sum, p) => sum + p.stock, 0)}
                      </span>
                    </td>
                    <td className="border-2 border-blue-400 px-4 py-3 text-center text-gray-900 text-lg">
                      {prizes.reduce((sum, p) => sum + p.probability, 0).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 景品編集セクション */}
          <h3 className="text-xl font-black text-gray-900 mb-3">景品編集</h3>
          <div className="space-y-4">
            {prizes.map(prize => (
              <div
                key={prize.id}
                className="prize-card flex items-center gap-4"
              >
                {/* 色表示 */}
                <div
                  className="w-16 h-16 rounded-full shadow-lg flex-shrink-0"
                  style={{ backgroundColor: prize.colorHex }}
                />

                {/* 景品名 */}
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-900 mb-1">景品名</label>
                  <input
                    type="text"
                    value={prize.name}
                    onChange={e => onUpdatePrize(prize.id, { name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-red-600 bg-white text-gray-900"
                  />
                </div>

                {/* 在庫数 */}
                <div className="w-28">
                  <label className="block text-sm font-bold text-gray-900 mb-1">在庫</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={prize.stock}
                    onChange={e =>
                      onUpdatePrize(prize.id, { stock: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-red-600 text-center bg-white text-gray-900 text-xl font-bold"
                  />
                </div>

                {/* 確率 */}
                <div className="w-28">
                  <label className="block text-sm font-bold text-gray-900 mb-1">確率(%)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    step="0.1"
                    value={prize.probability.toFixed(1)}
                    onChange={e =>
                      onUpdatePrize(prize.id, {
                        probability: Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-red-600 text-center bg-white text-gray-900 text-xl font-bold"
                  />
                </div>

                {/* 削除ボタン */}
                {prizes.length > 1 && (
                  <button
                    onClick={() => onRemovePrize(prize.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold"
                  >
                    削除
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 確率合計表示 */}
          <div className="mt-6 p-4 bg-amber-100 rounded-lg border-2 border-amber-300">
            <p className="text-lg font-bold text-gray-900 text-center">
              確率合計: {prizes.reduce((sum, p) => sum + p.probability, 0).toFixed(1)}%
              {Math.abs(prizes.reduce((sum, p) => sum + p.probability, 0) - 100) > 0.1 && (
                <span className="ml-2 text-red-700 font-black">（100%に調整してください）</span>
              )}
            </p>
          </div>

          {/* 新しい景品を追加 */}
          {canAddMore && nextColor && (
            <button
              onClick={onAddPrize}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg font-bold border-2 border-cyan-600"
            >
              <span>新しい色を追加（{nextColor.name}）</span>
            </button>
          )}
        </div>

        {/* フッター */}
        <div className="bg-japanese-cream p-6 border-t-4 border-japanese-wood">
          <div className="text-center mb-4">
            <p className="text-base text-white font-black">
              ※ 変更内容は自動的に保存されます
            </p>
          </div>
          <button onClick={onClose} className="w-full retro-button text-lg">
            閉じる
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
