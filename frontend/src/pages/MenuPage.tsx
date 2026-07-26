import React from 'react';
import { useMenu } from '@/hooks/useMenu';
import { MenuCategoryFilter } from '@/components/menu/MenuCategoryFilter';
import MenuItemsGrid from '@/components/menu/MenuItemsGrid';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';

const MenuPage: React.FC = () => {
  const { menuItems, categories, isLoading, error, setSelectedCategory, selectedCategory } = useMenu();

  return (
    <Layout>
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/menu-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Circuit House</h1>
          <p className="text-xl md:text-2xl">Savor the Flavors of Circuit House</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#2D3748] mb-8">Our Delicious Menu</h2>

          {isLoading && (
            <div className="flex flex-wrap justify-center gap-4 py-8">
              <Skeleton className="rounded-full px-6 py-2 h-10 w-24" />
              <Skeleton className="rounded-full px-6 py-2 h-10 w-32" />
              <Skeleton className="rounded-full px-6 py-2 h-10 w-28" />
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 py-8">
              <p>Error loading menu: {error.message}</p>
            </div>
          )}

          {!isLoading && categories && (
            <MenuCategoryFilter
              categories={categories}
              selectedCategoryId={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          <MenuItemsGrid menuItems={menuItems || []} isLoading={isLoading} />
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;