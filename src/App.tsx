import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  FOOD_ITEMS,
  FoodItem
} from './data/foodData';
import { TimerItem } from './types';
import { QueueCard } from './components/QueueCard';
import { CategoryBar } from './components/CategoryBar';
import { FoodCard } from './components/FoodCard';
import { soundManager } from './utils/sound';
import {
  Flame,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Sparkles,
  Soup,
  ListOrdered
} from 'lucide-react';

export const App: React.FC = () => {
  // Theme state: defaults to light ('light' | 'dark')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('hotpot_theme') as 'light' | 'dark') || 'light';
  });

  // Sound toggle state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active category filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Queue of currently boiling foods
  const [queue, setQueue] = useState<TimerItem[]>([]);

  // Current timestamp tick for re-rendering countdowns
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Ref to track which instanceIds have already triggered celebration
  const alertedIdsRef = useRef<Set<string>>(new Set());

  // Apply theme class to <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hotpot_theme', theme);
  }, [theme]);

  // High-precision clock ticker for smooth progress and instant alarms
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      // Check for any newly finished timers
      setQueue((prevQueue) => {
        let hasFinishedNew = false;
        prevQueue.forEach((item) => {
          if (now >= item.endTime && !alertedIdsRef.current.has(item.instanceId)) {
            alertedIdsRef.current.add(item.instanceId);
            hasFinishedNew = true;
          }
        });

        if (hasFinishedNew) {
          // Play celebration sound, trigger haptic vibration and confetti
          soundManager.playDone();
          soundManager.vibrate([100, 50, 150]);
          try {
            confetti({
              particleCount: 35,
              spread: 60,
              origin: { y: 0.3 }
            });
          } catch {
            // Ignore confetti errors
          }
        }

        return prevQueue;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // Add food into queue
  const handleAddFood = (food: FoodItem) => {
    soundManager.playDrop();
    soundManager.vibrate(30);

    const now = Date.now();
    const newItem: TimerItem = {
      instanceId: `${food.id}_${now}_${Math.random().toString(36).slice(2, 6)}`,
      foodId: food.id,
      name: food.name,
      icon: food.icon,
      color: food.color,
      duration: food.duration,
      startTime: now,
      endTime: now + food.duration * 1000,
    };

    setQueue((prev) => [newItem, ...prev]);
  };

  // Remove from queue (either swiped left or clicked delete)
  const handleDeleteItem = (instanceId: string) => {
    soundManager.playDelete();
    soundManager.vibrate(20);
    alertedIdsRef.current.delete(instanceId);
    setQueue((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  // Clear all in queue
  const handleClearAll = () => {
    if (queue.length === 0) return;
    soundManager.playDelete();
    alertedIdsRef.current.clear();
    setQueue([]);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toggle sound
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
  };

  // Filter food items
  const filteredFoods = activeCategory === 'all'
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((item) => item.category === activeCategory);

  const readyCount = queue.filter((item) => currentTime >= item.endTime).length;

  return (
    <div className="flex flex-col h-screen w-full max-w-lg mx-auto bg-amber-50/40 dark:bg-[#12131A] text-gray-900 dark:text-gray-100 transition-colors duration-300 select-none overflow-hidden">
      {/* Top Header Bar */}
      <header className="px-4 py-2.5 bg-white/80 dark:bg-[#1A1C26]/90 backdrop-blur border-b-2 border-gray-800 dark:border-gray-700 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-red-500 border-2 border-gray-800 dark:border-gray-600 flex items-center justify-center text-white shadow-cartoon-press">
            <Flame size={20} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight flex items-center gap-1">
              火锅涮烫助手
              <span className="text-xs px-1.5 py-0.2 rounded-md bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold">
                PRO
              </span>
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              精准倒计时 • 绝不烫老
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-8 h-8 rounded-lg border-2 border-gray-800 dark:border-gray-600 bg-white dark:bg-[#252836] flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-cartoon-press active:translate-y-0.5 transition-all"
            title={soundEnabled ? '关闭音效' : '开启音效'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border-2 border-gray-800 dark:border-gray-600 bg-white dark:bg-[#252836] flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-cartoon-press active:translate-y-0.5 transition-all"
            title={theme === 'light' ? '切换暗色主题' : '切换亮色主题'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
          </button>
        </div>
      </header>

      {/* UPPER HALF: Active Boiling Queue */}
      <section className="flex-1 flex flex-col min-h-0 px-3 pt-2.5 pb-1 bg-gradient-to-b from-red-500/5 to-transparent dark:from-red-950/10">
        <div className="flex items-center justify-between mb-2 px-1 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-black text-gray-800 dark:text-gray-200">
            <ListOrdered size={15} className="text-red-500" />
            <span>锅中涮煮计划 ({queue.length})</span>
            {readyCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white animate-bounce-slight flex items-center gap-1 shadow-sm">
                <Sparkles size={10} /> {readyCount} 样可捞!
              </span>
            )}
          </div>

          {queue.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[11px] font-bold text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              全部捞出清空
            </button>
          )}
        </div>

        {/* Scrollable Queue Area */}
        <div className="flex-1 overflow-y-auto pr-0.5">
          {queue.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-white/40 dark:bg-black/10">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-gray-800/80 flex items-center justify-center text-3xl mb-2 border-2 border-dashed border-amber-300 dark:border-gray-600 animate-pulse">
                <Soup size={32} className="text-amber-500" />
              </div>
              <div className="font-extrabold text-sm text-gray-700 dark:text-gray-300">
                锅底已烧开，快下菜吧！
              </div>
              <div className="text-xs text-gray-400 mt-1 max-w-[220px]">
                点击下方菜品即可自动倒计时，到时间变绿提醒，支持左划快速捞出
              </div>
            </div>
          ) : (
            queue.map((item) => (
              <QueueCard
                key={item.instanceId}
                item={item}
                currentTime={currentTime}
                onDelete={handleDeleteItem}
              />
            ))
          )}
        </div>
      </section>

      {/* LOWER HALF: Food Menu & Categories */}
      <section className="h-[48vh] sm:h-[50vh] flex flex-col min-h-0 bg-white dark:bg-[#161822] border-t-2 border-gray-800 dark:border-gray-700 rounded-t-3xl shadow-cartoon-lg z-10 shrink-0">
        {/* Category Tabs */}
        <div className="px-3 pt-2.5 pb-1 shrink-0">
          <CategoryBar activeId={activeCategory} onSelect={setActiveCategory} />
        </div>

        {/* Food Grid */}
        <div className="flex-1 overflow-y-auto p-3 pt-1">
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pb-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
