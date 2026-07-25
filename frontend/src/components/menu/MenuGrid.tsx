import { MenuItemDto } from '@/types/menu';
import { MenuItemCard } from './MenuItemCard';

interface MenuGridProps {
  menuItems: MenuItemDto[];
}

export const MenuGrid = ({ menuItems }: MenuGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} menuItem={item} />
      ))}
    </div>
  );
};