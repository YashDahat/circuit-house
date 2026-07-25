import { MenuItemCategory } from '@/types/menu';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface MenuCategoryFilterProps {
  categories: MenuItemCategory[];
  onSelectCategory: (category: MenuItemCategory | undefined) => void;
  selectedCategory: MenuItemCategory | undefined;
}

const categoryDisplayNames: Record<MenuItemCategory, string> = {
  APPETIZER: 'Appetizers',
  MAIN_COURSE: 'Main Courses',
  DESSERT: 'Desserts',
  BEVERAGE: 'Beverages',
  SALAD: 'Salads',
  SIDE: 'Sides',
  DRINK: 'Drinks',
};

const MenuCategoryFilter: React.FC<MenuCategoryFilterProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <Button
        variant="outline"
        className={clsx(
          "transition-all duration-200",
          !selectedCategory
            ? "bg-[#D69E2E] text-white hover:bg-[#B78824]"
            : "bg-white text-[#2D3748] hover:bg-gray-100"
        )}
        onClick={() => onSelectCategory(undefined)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          className={clsx(
            "transition-all duration-200",
            selectedCategory === category
              ? "bg-[#D69E2E] text-white hover:bg-[#B78824]"
              : "bg-white text-[#2D3748] hover:bg-gray-100"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {categoryDisplayNames[category] || category}
        </Button>
      ))}
    </div>
  );
};

export default MenuCategoryFilter;