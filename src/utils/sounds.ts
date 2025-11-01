/**
 * HTML5 Audioを使用した効果音再生
 */

// 音声ファイルのプリロード
let tamaAudio: HTMLAudioElement | null = null;
let atariAudio: HTMLAudioElement | null = null;

function preloadAudio() {
  if (!tamaAudio) {
    tamaAudio = new Audio('/sound/tama.mp3');
    tamaAudio.volume = 0.6;
  }
  if (!atariAudio) {
    atariAudio = new Audio('/sound/atari.mp3');
    atariAudio.volume = 0.7;
  }
}

// 初回実行時にプリロード
preloadAudio();

/**
 * ガラポンの回転音（tama.mp3を再生）
 */
export function playSpinSound(duration: number = 5000) {
  preloadAudio();

  if (tamaAudio) {
    // 既に再生中の場合は停止してリセット
    tamaAudio.pause();
    tamaAudio.currentTime = 0;

    // 再生
    tamaAudio.play().catch(err => {
      console.error('Failed to play tama.mp3:', err);
    });

    // duration後に停止
    const stopTimer = setTimeout(() => {
      if (tamaAudio) {
        tamaAudio.pause();
        tamaAudio.currentTime = 0;
      }
    }, duration);

    return () => {
      clearTimeout(stopTimer);
      if (tamaAudio) {
        tamaAudio.pause();
        tamaAudio.currentTime = 0;
      }
    };
  }

  return () => {};
}

/**
 * 当選音（atari.mp3を再生）
 */
export function playWinSound(rarity: 'common' | 'rare' | 'super-rare' = 'common') {
  preloadAudio();

  if (atariAudio) {
    // 既に再生中の場合は停止してリセット
    atariAudio.pause();
    atariAudio.currentTime = 0;

    // レア度に応じて音量を調整
    if (rarity === 'super-rare') {
      atariAudio.volume = 0.9;
    } else if (rarity === 'rare') {
      atariAudio.volume = 0.8;
    } else {
      atariAudio.volume = 0.7;
    }

    // 再生
    atariAudio.play().catch(err => {
      console.error('Failed to play atari.mp3:', err);
    });
  }
}

/**
 * Web Audio API コンテキスト（クリック音・エラー音用）
 */
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * ボタンクリック音
 */
export function playClickSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 800;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

/**
 * エラー音
 */
export function playErrorSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.value = 200;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
}
