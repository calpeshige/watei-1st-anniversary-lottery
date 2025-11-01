import type { Prize } from '../types';

/**
 * 確率に基づいて景品を抽選
 */
export function drawPrize(prizes: Prize[]): Prize | null {
  // 在庫がある景品のみをフィルタリング
  const availablePrizes = prizes.filter(p => p.stock > 0);

  if (availablePrizes.length === 0) {
    return null;
  }

  // 確率の合計を計算
  const totalProbability = availablePrizes.reduce((sum, p) => sum + p.probability, 0);

  // ランダムな値を生成
  const random = Math.random() * totalProbability;

  // 累積確率で抽選
  let cumulative = 0;
  for (const prize of availablePrizes) {
    cumulative += prize.probability;
    if (random <= cumulative) {
      return prize;
    }
  }

  // フォールバック（理論上は到達しない）
  return availablePrizes[0];
}

/**
 * 全景品の在庫がゼロかチェック
 */
export function isAllStockEmpty(prizes: Prize[]): boolean {
  return prizes.every(p => p.stock <= 0);
}

/**
 * 次に追加可能な色を取得
 */
export function getNextAvailableColor(
  usedColors: string[],
  availableColors: { color: string; hex: string; name: string }[]
): { color: string; hex: string; name: string } | null {
  const unused = availableColors.find(c => !usedColors.includes(c.color));
  return unused || null;
}

/**
 * 確率の合計が100%になるように正規化
 */
export function normalizeProbabilities(prizes: Prize[]): Prize[] {
  const total = prizes.reduce((sum, p) => sum + p.probability, 0);

  if (total === 0) {
    // 全て0の場合は均等分配
    const equalProb = 100 / prizes.length;
    return prizes.map(p => ({ ...p, probability: equalProb }));
  }

  if (Math.abs(total - 100) < 0.01) {
    return prizes; // すでに100%に近い
  }

  // 100%に正規化
  return prizes.map(p => ({
    ...p,
    probability: (p.probability / total) * 100,
  }));
}
