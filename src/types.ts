export type BallColor = 'gold' | 'silver' | 'bronze' | 'red' | 'green' | 'purple' | 'blue' | 'orange' | 'pink' | 'cyan' | 'yellow';

export interface Prize {
  id: string;
  color: BallColor;
  name: string;
  stock: number;
  probability: number; // パーセンテージ (0-100)
  colorHex: string;
}

export interface LotteryState {
  prizes: Prize[];
  isSpinning: boolean;
  lastWinner: Prize | null;
  totalDraws: number;
}

export interface Settings {
  soundEnabled: boolean;
  animationDuration: number; // ミリ秒
}

// 色の定義（追加用）
export const AVAILABLE_COLORS: { color: BallColor; hex: string; name: string }[] = [
  { color: 'gold', hex: '#FFD700', name: '金' },
  { color: 'silver', hex: '#C0C0C0', name: '銀' },
  { color: 'bronze', hex: '#CD7F32', name: '銅' },
  { color: 'red', hex: '#DC143C', name: '赤' },
  { color: 'green', hex: '#2E8B57', name: '緑' },
  { color: 'purple', hex: '#9370DB', name: '紫' },
  { color: 'blue', hex: '#4169E1', name: '青' },
  { color: 'orange', hex: '#FF8C00', name: 'オレンジ' },
  { color: 'pink', hex: '#FF69B4', name: 'ピンク' },
  { color: 'cyan', hex: '#00CED1', name: '水色' },
  { color: 'yellow', hex: '#FFD700', name: '黄色' },
];

// 初期景品データ
export const INITIAL_PRIZES: Prize[] = [
  {
    id: '1',
    color: 'gold',
    name: 'お食事券1万円分',
    stock: 1,
    probability: 3,
    colorHex: '#FFD700',
  },
  {
    id: '2',
    color: 'silver',
    name: 'お食事券5000円分',
    stock: 2,
    probability: 7,
    colorHex: '#C0C0C0',
  },
  {
    id: '3',
    color: 'bronze',
    name: 'お食事券3000円分',
    stock: 3,
    probability: 10,
    colorHex: '#CD7F32',
  },
  {
    id: '4',
    color: 'red',
    name: 'お食事券1000円分',
    stock: 150,
    probability: 70,
    colorHex: '#DC143C',
  },
  {
    id: '5',
    color: 'green',
    name: 'ドリンク無料券',
    stock: 100,
    probability: 10,
    colorHex: '#2E8B57',
  },
];
