import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useMenu } from '@/hooks/useMenu';
import { MenuItemCategory, MenuItemDto } from '@/types/menu';
import MenuCategoryFilter from '@/components/menu/MenuCategoryFilter';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuItemCategory | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: menuItems, isLoading, isError, error } = useMenu(selectedCategory);

  const allCategories = useMemo(() => {
    if (!menuItems) return [];
    const categories = new Set<MenuItemCategory>();
    menuItems.forEach(item => item.category && categories.add(item.category));
    return Array.from(categories);
  }, [menuItems]);

  const filteredMenuItems = useMemo(() => {
    if (!menuItems) return [];
    return menuItems.filter(item =>
      (item.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [menuItems, searchTerm]);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Exquisite Menu</h1>
          <p className="mt-4 text-xl text-white">A Culinary Journey Awaits at Circuit House</p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Discover Our Dishes</h2>

          <MenuCategoryFilter
            categories={allCategories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <div className="mb-8 flex justify-center">
            <Input
              type="text"
              placeholder="Search menu items..."
              className="max-w-md w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D69E2E] transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <Skeleton className="h-48 w-full rounded-md mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500">
              <p>Error loading menu: {error?.message}</p>
            </div>
          )}

          {!isLoading && !isError && filteredMenuItems.length === 0 && (
            <div className="text-center text-[#2D3748] py-8">
              <p className="text-xl font-semibold">No menu items found.</p>
              <p className="text-md">Try adjusting your search or filter.</p>
            </div>
          )}

          {!isLoading && !isError && filteredMenuItems.length > 0 && (
            <MenuGrid menuItems={filteredMenuItems as MenuItemDto[]} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;