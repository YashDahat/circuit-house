import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import MenuItemsGrid from '@/components/menu/MenuItemsGrid';
import { useMenuItemCategories, useMenuItems } from '@/hooks/useMenu';
import { Helmet } from 'react-helmet-async';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useMenuItemCategories();
  const { data: menuItems, isLoading: isLoadingMenuItems, error: menuItemsError } = useMenuItems(selectedCategory ?? undefined);

  const handleSelectCategory = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
  };

  if (isLoadingCategories || isLoadingMenuItems) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A202C] mb-4">Our Exquisite Menu</h1>
            <p className="text-lg text-[#2D3748] mb-8">
              Discover a culinary journey crafted with passion and the finest ingredients.
            </p>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D69E2E]"></div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (categoriesError || menuItemsError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A202C] mb-4">Our Exquisite Menu</h1>
            <p className="text-lg text-[#2D3748] mb-8">
              Discover a culinary journey crafted with passion and the finest ingredients.
            </p>
            <p className="text-red-500">Error loading menu: {categoriesError?.message || menuItemsError?.message}</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Menu - Circuit House</title>
        <meta name="description" content="Explore the exquisite menu of Circuit House, featuring a variety of dishes crafted with passion and the finest ingredients." />
      </Helmet>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1A202C] mb-4">Our Exquisite Menu</h1>
          <p className="text-lg text-[#2D3748] mb-8">
            Discover a culinary journey crafted with passion and the finest ingredients.
          </p>
          {categories && (
            <MenuCategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          )}
          {menuItems && menuItems.length > 0 ? (
            <MenuItemsGrid menuItems={menuItems} />
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-[#2D3748]">No menu items found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;