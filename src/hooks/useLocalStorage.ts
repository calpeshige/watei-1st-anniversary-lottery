import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // LocalStorageから初期値を取得
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // 値が変更されたらLocalStorageに保存
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  // 他のタブやウィンドウからのLocalStorage変更を監視
  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing storage event for ${key}:`, error);
        }
      }
    },
    [key]
  );

  // ページがバックグラウンドから戻ってきた時にLocalStorageを再読み込み
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsedValue = JSON.parse(item);
          setStoredValue(parsedValue);
        }
      } catch (error) {
        console.error(`Error reloading ${key} from localStorage on visibility change:`, error);
      }
    }
  }, [key]);

  useEffect(() => {
    // storage イベントリスナーを追加（他のタブからの変更を検知）
    window.addEventListener('storage', handleStorageChange);

    // visibilitychange イベントリスナーを追加（バックグラウンドから戻った時）
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleStorageChange, handleVisibilityChange]);

  return [storedValue, setStoredValue] as const;
}
