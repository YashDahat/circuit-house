package com.circuithouse.config;

import com.circuithouse.model.MenuItem;
import com.circuithouse.model.MenuItemCategory;
import com.circuithouse.repository.MenuItemCategoryRepository;
import com.circuithouse.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;

    public DataSeeder(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (menuItemCategoryRepository.count() == 0 && menuItemRepository.count() == 0) {
            seedData();
        }
    }

    private MenuItemCategory makeCategory(String name, String description) {
        MenuItemCategory c = new MenuItemCategory();
        c.setName(name);
        c.setDescription(description);
        return c;
    }

    private MenuItem makeMenuItem(String name, String description, BigDecimal price, String imageUrl, MenuItemCategory category) {
        MenuItem m = new MenuItem();
        m.setName(name);
        m.setDescription(description);
        m.setPrice(price);
        m.setImageUrl(imageUrl);
        m.setCategory(category);
        return m;
    }

    private void seedData() {
        // Seed Menu Item Categories
        MenuItemCategory appetizers   = makeCategory("Appetizers",   "Delicious starters to whet your appetite.");
        MenuItemCategory mainCourses  = makeCategory("Main Courses", "Hearty and satisfying main dishes.");
        MenuItemCategory desserts     = makeCategory("Desserts",     "Sweet treats to end your meal.");
        MenuItemCategory beverages    = makeCategory("Beverages",    "Refreshing drinks for every taste.");

        menuItemCategoryRepository.saveAll(Arrays.asList(appetizers, mainCourses, desserts, beverages));

        // Seed Menu Items
        List<MenuItem> menuItems = Arrays.asList(
            makeMenuItem("Spring Rolls",         "Crispy vegetable spring rolls with sweet chili sauce.",                         new BigDecimal("8.99"),  "https://example.com/spring-rolls.jpg",   appetizers),
            makeMenuItem("Crispy Calamari",      "Lightly fried calamari with marinara sauce.",                                   new BigDecimal("12.50"), "https://example.com/calamari.jpg",       appetizers),
            makeMenuItem("Grilled Salmon",       "Fresh grilled salmon with asparagus and lemon butter sauce.",                   new BigDecimal("24.99"), "https://example.com/grilled-salmon.jpg", mainCourses),
            makeMenuItem("Ribeye Steak",         "12oz ribeye steak with mashed potatoes and seasonal vegetables.",               new BigDecimal("32.00"), "https://example.com/ribeye-steak.jpg",   mainCourses),
            makeMenuItem("Pasta Primavera",      "Seasonal vegetables tossed with pasta in a light garlic sauce.",                new BigDecimal("18.75"), "https://example.com/pasta-primavera.jpg",mainCourses),
            makeMenuItem("Chocolate Lava Cake",  "Warm chocolate cake with a molten center, served with vanilla ice cream.",      new BigDecimal("9.50"),  "https://example.com/lava-cake.jpg",      desserts),
            makeMenuItem("New York Cheesecake",  "Classic New York style cheesecake with berry compote.",                         new BigDecimal("8.75"),  "https://example.com/cheesecake.jpg",     desserts),
            makeMenuItem("Iced Tea",             "Freshly brewed iced tea.",                                                      new BigDecimal("3.00"),  "https://example.com/iced-tea.jpg",       beverages),
            makeMenuItem("Soft Drink",           "Assorted soft drinks.",                                                         new BigDecimal("2.50"),  "https://example.com/soda.jpg",           beverages),
            makeMenuItem("Coffee",               "Freshly brewed hot coffee.",                                                    new BigDecimal("4.00"),  "https://example.com/coffee.jpg",         beverages)
        );

        menuItemRepository.saveAll(menuItems);
        System.out.println("Database seeded with initial menu data.");
    }
}
