import { MenuItemCategoryDto } from '@/types/menu';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface MenuCategoryFilterProps {
  categories: MenuItemCategoryDto[];
  selectedCategoryId: number | null;
  setSelectedCategory: (categoryId: number | null) => void;
}

export function MenuCategoryFilter({
  categories,
  selectedCategoryId,
  setSelectedCategory,
}: MenuCategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      <Button
        onClick={() => setSelectedCategory(null)}
        className={clsx(
          'rounded-full px-6 py-2 transition-all duration-200',
          selectedCategoryId === null
            ? 'bg-[#D69E2E] hover:bg-[#B78725] text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-[#2D3748]'
        )}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => setSelectedCategory(category.id ?? null)}
          className={clsx(
            'rounded-full px-6 py-2 transition-all duration-200',
            selectedCategoryId === category.id
              ? 'bg-[#D69E2E] hover:bg-[#B78725] text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-[#2D3748]'
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}