import React from 'react';
import { FoodItem } from '../data/foodData';
import { Plus } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
  onAdd: (food: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onAdd }) => {
  return (
    <button
      onClick={() => onAdd(food)}
      className="group relative flex flex-col items-center justify-between p-2.5 bg-white dark:bg-[#1E202C] rounded-2xl border-2 border-gray-800 dark:border-gray-700 shadow-cartoon active:translate-y-1 active:shadow-cartoon-press transition-all duration-150 text-left overflow-hidden select-none hover:border-red-400"
    >
      {/* Time badge on top right */}
      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-extrabold text-[10px] border border-amber-300 dark:border-amber-700">
        {food.duration < 60 ? `${food.duration}s` : `${Math.floor(food.duration / 60)}m${food.duration % 60 ? (food.duration % 60) + 's' : ''}`}
      </div>

      {/* Food Icon */}
      <div className="text-3xl my-1 group-hover:scale-110 transition-transform duration-200">
        {food.icon}
      </div>

      {/* Name and tip */}
      <div className="w-full text-center mt-1">
        <div className="font-extrabold text-xs text-gray-900 dark:text-white truncate">
          {food.name}
        </div>
        {food.tip && (
          <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
            {food.tip}
          </div>
        )}
      </div>

      {/* Add indicator button */}
      <div className="mt-1.5 w-full py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white flex items-center justify-center gap-0.5 text-[10px] font-bold transition-colors">
        <Plus size={12} strokeWidth={3} /> 下锅
      </div>
    </button>
  );
};
