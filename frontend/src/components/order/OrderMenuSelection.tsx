import React from 'react';
import { useMenuItems, useMenuItemCategories } from '@/hooks/useMenu';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Loader2 } from 'lucide-react';

const OrderMenuSelection: React.FC = () => {
  const { cartItems, addItem } = useCart();
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useMenuItemCategories();
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined);
  const { data: menuItems, isLoading: isLoadingMenuItems, error: menuItemsError } = useMenuItems(selectedCategory);

  const handleAddToCart = (menuItem: { id: string; name: string; price: number; imageUrl: string | null }) => {
    if (menuItem.id && menuItem.name && menuItem.price !== null) {
      addItem(
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          imageUrl: menuItem.imageUrl,
          categoryName: null, // Not used in cart item
          description: null, // Not used in cart item
          active: null, // Not used in cart item
        },
        1,
      );
    }
  };

  if (isLoadingCategories || isLoadingMenuItems) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#D69E2E]" />
      </div>
    );
  }

  if (categoriesError || menuItemsError) {
    return (
      <div className="text-center text-red-500">
        Error loading menu: {categoriesError?.message || menuItemsError?.message}
      </div>
    );
  }

  const allCategories = [{ id: 'all', name: 'All', description: null }, ...(categories || [])];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#2D3748]">Our Menu</h2>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => setSelectedCategory(value === 'all' ? undefined : value)}
        >
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 p-1 bg-gray-100 rounded-md">
            {allCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#D69E2E] data-[state=active]:text-white data-[state=active]:shadow hover:bg-gray-200"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {allCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(menuItems || []).filter(item => category.id === 'all' || item.categoryName === category.name).map((item) => (
                  <Card key={item.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <img
                      src={item.imageUrl ?? '/placeholder-food.jpg'}
                      alt={item.name ?? 'Menu item'}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2 text-[#2D3748]">{item.name}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-bold text-[#D69E2E]">${item.price?.toFixed(2)}</span>
                        <Button
                          onClick={() =>
                            handleAddToCart({
                              id: item.id!,
                              name: item.name!,
                              price: item.price!,
                              imageUrl: item.imageUrl,
                            })
                          }
                          className="bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-6 py-2 transition-all duration-200"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {(menuItems || []).filter(item => category.id === 'all' || item.categoryName === category.name).length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No menu items found in this category.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default OrderMenuSelection;