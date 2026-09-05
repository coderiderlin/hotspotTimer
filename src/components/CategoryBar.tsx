import React from 'react';
import { FoodCategory, CATEGORIES } from '../data/foodData';

interface CategoryBarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeId, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth">
      {CATEGORIES.map((cat: FoodCategory) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap border-2 transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-red-500 text-white border-gray-900 shadow-cartoon -translate-y-0.5'
                : 'bg-white dark:bg-[#1E202C] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 shadow-cartoon-press hover:border-gray-500'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
