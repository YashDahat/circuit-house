import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { MenuItemCategory } from '@/types/menu';
import clsx from 'clsx';

interface MenuCategoryTabsProps {
  categories: MenuItemCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

const MenuCategoryTabs: React.FC<MenuCategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <Tabs
      defaultValue="All"
      className="w-full flex justify-center mb-8"
      onValueChange={(value) => onSelectCategory(value === 'All' ? null : value)}
    >
      <TabsList className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-full shadow-sm">
        <TabsTrigger
          value="All"
          className={clsx(
            'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedCategory === null
              ? 'bg-[#D69E2E] text-white shadow-md'
              : 'bg-gray-200 text-[#2D3748] hover:bg-gray-300',
          )}
        >
          All
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.name ?? ''}
            className={clsx(
              'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedCategory === category.name
                ? 'bg-[#D69E2E] text-white shadow-md'
                : 'bg-gray-200 text-[#2D3748] hover:bg-gray-300',
            )}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default MenuCategoryTabs;