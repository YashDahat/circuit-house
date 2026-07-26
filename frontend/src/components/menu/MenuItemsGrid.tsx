import { MenuItemDto } from '@/types/menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuItemsGridProps {
  menuItems: MenuItemDto[];
  isLoading: boolean;
}

const MenuItemsGrid: React.FC<MenuItemsGridProps> = ({ menuItems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="flex flex-col">
            <Skeleton className="w-full h-48 rounded-t-xl" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <div className="p-6 pt-0">
              <Skeleton className="h-6 w-1/4" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700">No menu items found for this category.</h3>
        <p className="text-gray-500 mt-2">Please select another category or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <Card key={item.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
          <img
            src={item.imageUrl ?? '/placeholder-food.jpg'}
            alt={item.name ?? 'Menu Item'}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#2D3748]">{item.name}</CardTitle>
            <CardDescription className="text-gray-600">{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <p className="text-lg font-bold text-[#D69E2E]">${item.price?.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuItemsGrid;