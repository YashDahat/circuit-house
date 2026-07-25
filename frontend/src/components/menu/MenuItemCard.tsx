import { MenuItemDto } from '@/types/menu';

interface MenuItemCardProps {
  menuItem: MenuItemDto;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col h-full transition-all duration-200 hover:shadow-lg">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={menuItem.imageUrl ?? 'https://via.placeholder.com/400x300'}
          alt={menuItem.name ?? 'Menu Item'}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-[#1A202C] mb-2">{menuItem.name ?? 'Unknown Item'}</h3>
      <p className="text-[#2D3748] text-sm mb-4 flex-grow">{menuItem.description ?? 'No description available.'}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-lg font-bold text-[#D69E2E]">${menuItem.price?.toFixed(2) ?? '0.00'}</span>
        {/* Add to cart button or other actions can go here */}
      </div>
    </div>
  );
};

export default MenuItemCard;