import { MenuItemDto } from '@/types/menu';

interface MenuItemsGridProps {
  menuItems: MenuItemDto[];
}

const MenuItemsGrid: React.FC<MenuItemsGridProps> = ({ menuItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col transition-all duration-200 hover:shadow-lg">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name ?? 'Menu Item'}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-[#1A202C] mb-2">{item.name}</h3>
          <p className="text-[#2D3748] flex-grow mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-[#D69E2E] font-bold text-lg">
              ${item.price?.toFixed(2) ?? 'N/A'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemsGrid;