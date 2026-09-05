import React, { useState, useRef } from 'react';
import { TimerItem } from '../types';
import { Trash2, Utensils, CheckCircle2 } from 'lucide-react';

interface QueueCardProps {
  item: TimerItem;
  currentTime: number;
  onDelete: (instanceId: string) => void;
}

export const QueueCard: React.FC<QueueCardProps> = ({ item, currentTime, onDelete }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const totalMs = item.duration * 1000;
  const elapsedMs = Math.max(0, currentTime - item.startTime);
  const remainingMs = Math.max(0, item.endTime - currentTime);
  const progress = Math.min(100, (elapsedMs / totalMs) * 100);
  const isFinished = remainingMs <= 0;
  const remainingSec = Math.ceil(remainingMs / 1000);

  // Touch event handlers for smooth swipe-to-delete
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const diff = e.touches[0].clientX - startXRef.current;
    // Only allow swiping to the left (negative diff)
    if (diff < 0) {
      setOffsetX(Math.max(-120, diff));
    } else {
      setOffsetX(0);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (offsetX < -70) {
      // Swiped enough to delete
      setOffsetX(-200);
      setTimeout(() => onDelete(item.instanceId), 150);
    } else {
      setOffsetX(0);
    }
  };

  // Mouse event handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    setIsSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    const diff = e.clientX - startXRef.current;
    if (diff < 0) {
      setOffsetX(Math.max(-120, diff));
    }
  };

  const handleMouseUp = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    if (offsetX < -70) {
      setOffsetX(-200);
      setTimeout(() => onDelete(item.instanceId), 150);
    } else {
      setOffsetX(0);
    }
  };

  const formatRemaining = (sec: number) => {
    if (sec <= 0) return '开吃！';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m > 0) {
      return `${m}分${s < 10 ? '0' : ''}${s}秒`;
    }
    return `${s}s`;
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-3 select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background delete action (revealed when swiped left) */}
      <div
        className="absolute inset-y-0 right-0 w-24 bg-red-500 flex items-center justify-center text-white font-bold rounded-r-2xl cursor-pointer"
        onClick={() => onDelete(item.instanceId)}
      >
        <div className="flex flex-col items-center gap-1">
          <Trash2 size={20} />
          <span className="text-xs">捞出</span>
        </div>
      </div>

      {/* Foreground card */}
      <div
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isSwiping ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className={`relative z-10 p-3.5 rounded-2xl border-2 transition-colors duration-300 flex items-center justify-between shadow-cartoon ${
          isFinished
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-emerald-400/20'
            : 'bg-white dark:bg-[#1E202C] border-gray-800 dark:border-gray-700'
        }`}
      >
        {/* Left: icon and info */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-800 dark:border-gray-600 shadow-cartoon-press transition-transform duration-300 ${
              isFinished ? 'scale-110 animate-bounce-slight bg-emerald-400' : 'bg-amber-100 dark:bg-gray-800'
            }`}
          >
            {item.icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-gray-900 dark:text-white">
                {item.name}
              </span>
              {isFinished ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                  <CheckCircle2 size={12} /> 最佳口感
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {item.duration}s
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-36 sm:w-48 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 mt-1.5 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isFinished
                    ? 'bg-emerald-500 animate-pulse-glow'
                    : 'bg-gradient-to-r from-amber-400 to-red-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: countdown and action button */}
        <div className="flex items-center gap-2 pl-2">
          <div className="text-right">
            <div
              className={`font-black tracking-tight ${
                isFinished
                  ? 'text-lg text-emerald-600 dark:text-emerald-400 animate-pulse'
                  : 'text-lg text-gray-900 dark:text-white'
              }`}
            >
              {formatRemaining(remainingSec)}
            </div>
            <div className="text-[10px] text-gray-400">
              {isFinished ? '左划或点捞' : '咕嘟煮熟中'}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.instanceId);
            }}
            title={isFinished ? '捞出开吃' : '移除'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 border-gray-800 dark:border-gray-600 active:translate-y-0.5 transition-all ${
              isFinished
                ? 'bg-emerald-500 text-white shadow-cartoon hover:bg-emerald-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-cartoon-press'
            }`}
          >
            {isFinished ? <Utensils size={18} /> : <Trash2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
