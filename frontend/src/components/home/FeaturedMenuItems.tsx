import { useMenu } from '@/hooks/useMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function FeaturedMenuItems() {
  const { menuItems, categories, isLoading, error, setSelectedCategory, selectedCategory } = useMenu();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <div className="p-6 pt-0">
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          Failed to load menu items. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Menu</h2>

        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          <Button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 rounded-full transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold'
                : 'bg-gray-200 hover:bg-gray-300 text-[#2D3748]'
            }`}
          >
            All
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id ?? null)}
              className={`px-8 py-3 rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold'
                  : 'bg-gray-200 hover:bg-gray-300 text-[#2D3748]'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems?.map((item) => (
            <Card key={item.id} className="flex flex-col">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name ?? 'Menu Item'}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg font-bold text-[#D69E2E]">
                  {item.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {menuItems?.length === 0 && (
          <div className="text-center text-gray-500 mt-8">No menu items found for this category.</div>
        )}
      </div>
    </section>
  );
}