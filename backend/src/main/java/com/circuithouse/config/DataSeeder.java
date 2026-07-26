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
import java.util.UUID;

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

    private void seedData() {
        // Seed Menu Item Categories
        MenuItemCategory appetizers = new MenuItemCategory(UUID.randomUUID(), "Appetizers", "Delicious starters to whet your appetite.");
        MenuItemCategory mainCourses = new MenuItemCategory(UUID.randomUUID(), "Main Courses", "Hearty and satisfying main dishes.");
        MenuItemCategory desserts = new MenuItemCategory(UUID.randomUUID(), "Desserts", "Sweet treats to end your meal.");
        MenuItemCategory beverages = new MenuItemCategory(UUID.randomUUID(), "Beverages", "Refreshing drinks for every taste.");

        List<MenuItemCategory> categories = Arrays.asList(appetizers, mainCourses, desserts, beverages);
        menuItemCategoryRepository.saveAll(categories);

        // Seed Menu Items
        MenuItem springRolls = new MenuItem(null, "Spring Rolls", "Crispy vegetable spring rolls with sweet chili sauce.", new BigDecimal("8.99"), "https://example.com/spring-rolls.jpg", appetizers);
        MenuItem calamari = new MenuItem(null, "Crispy Calamari", "Lightly fried calamari with marinara sauce.", new BigDecimal("12.50"), "https://example.com/calamari.jpg", appetizers);

        MenuItem grilledSalmon = new MenuItem(null, "Grilled Salmon", "Fresh grilled salmon with asparagus and lemon butter sauce.", new BigDecimal("24.99"), "https://example.com/grilled-salmon.jpg", mainCourses);
        MenuItem beefSteak = new MenuItem(null, "Ribeye Steak", "12oz ribeye steak with mashed potatoes and seasonal vegetables.", new BigDecimal("32.00"), "https://example.com/ribeye-steak.jpg", mainCourses);
        MenuItem pastaPrimavera = new MenuItem(null, "Pasta Primavera", "Seasonal vegetables tossed with pasta in a light garlic sauce.", new BigDecimal("18.75"), "https://example.com/pasta-primavera.jpg", mainCourses);

        MenuItem chocolateLavaCake = new MenuItem(null, "Chocolate Lava Cake", "Warm chocolate cake with a molten center, served with vanilla ice cream.", new BigDecimal("9.50"), "https://example.com/lava-cake.jpg", desserts);
        MenuItem cheesecake = new MenuItem(null, "New York Cheesecake", "Classic New York style cheesecake with berry compote.", new BigDecimal("8.75"), "https://example.com/cheesecake.jpg", desserts);

        MenuItem icedTea = new MenuItem(null, "Iced Tea", "Freshly brewed iced tea.", new BigDecimal("3.00"), "https://example.com/iced-tea.jpg", beverages);
        MenuItem soda = new MenuItem(null, "Soft Drink", "Assorted soft drinks.", new BigDecimal("2.50"), "https://example.com/soda.jpg", beverages);
        MenuItem coffee = new MenuItem(null, "Coffee", "Freshly brewed hot coffee.", new BigDecimal("4.00"), "https://example.com/coffee.jpg", beverages);

        List<MenuItem> menuItems = Arrays.asList(
                springRolls, calamari,
                grilledSalmon, beefSteak, pastaPrimavera,
                chocolateLavaCake, cheesecake,
                icedTea, soda, coffee
        );
        menuItemRepository.saveAll(menuItems);

        System.out.println("Database seeded with initial menu data.");
    }
}