package com.circuithouse.config;

import com.circuithouse.dto.EventDto;
import com.circuithouse.dto.MenuItemDto;
import com.circuithouse.model.MenuItemCategory;
import com.circuithouse.service.EventService;
import com.circuithouse.service.MenuService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MenuService menuService;
    private final EventService eventService;

    public DataSeeder(MenuService menuService, EventService eventService) {
        this.menuService = menuService;
        this.eventService = eventService;
    }

    @Override
    public void run(String... args) throws Exception {
        seedMenuItems();
        seedEvents();
    }

    private void seedMenuItems() {
        if (menuService.getAllMenuItems().isEmpty()) {
            List<MenuItemDto> menuItems = Arrays.asList(
                    MenuItemDto.builder()
                            .name("Classic Burger")
                            .description("Juicy beef patty, lettuce, tomato, onion, pickles, and special sauce on a brioche bun.")
                            .price(new BigDecimal("12.99"))
                            .category(MenuItemCategory.MAIN_COURSE)
                            .imageUrl("https://images.unsplash.com/photo-1568901346379-8ce8e1e77b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYnVyZ2VyfGVufDB8fHx8MTcxNjY0NTM0Nnww&ixlib=rb-4.0.3&q=80&w=1080")
                            .build(),
                    MenuItemDto.builder()
                            .name("Spicy Chicken Sandwich")
                            .description("Crispy fried chicken, spicy mayo, lettuce, and pickles on a toasted bun.")
                            .price(new BigDecimal("11.50"))
                            .category(MenuItemCategory.MAIN_COURSE)
                            .imageUrl("https://images.unsplash.com/photo-1626074218365-f126589d9845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2FuZHdpY2h8ZW58MHx8fHwxNzE2NjQ1MzQ3fDA&ixlib=rb-4.0.3&q=80&w=1080")
                            .build(),
                    MenuItemDto.builder()
                            .name("Caesar Salad")
                            .description("Fresh romaine lettuce, parmesan cheese, croutons, and Caesar dressing.")
                            .price(new BigDecimal("9.75"))
                            .category(MenuItemCategory.SALAD)
                            .imageUrl("https://images.unsplash.com/photo-1550304943-4e444a673b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxDYWVzYXIlMjBTYWxhZHxlbnwwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .build(),
                    MenuItemDto.builder()
                            .name("French Fries")
                            .description("Crispy golden french fries, lightly salted.")
                            .price(new BigDecimal("4.00"))
                            .category(MenuItemCategory.SIDE)
                            .imageUrl("https://images.unsplash.com/photo-1593409861614-722e1188f61d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .build(),
                    MenuItemDto.builder()
                            .name("Chocolate Milkshake")
                            .description("Rich chocolate ice cream blended with milk, topped with whipped cream.")
                            .price(new BigDecimal("6.50"))
                            .category(MenuItemCategory.DRINK)
                            .imageUrl("https://images.unsplash.com/photo-1572490122746-778917f9172c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtaWxrc2hha2V8ZW58MHx8fHwxNzE2NjQ1MzQ3fDA&ixlib=rb-4.0.3&q=80&w=1080")
                            .build(),
                    MenuItemDto.builder()
                            .name("Apple Pie")
                            .description("Warm apple pie with a flaky crust, served with a scoop of vanilla ice cream.")
                            .price(new BigDecimal("7.00"))
                            .category(MenuItemCategory.DESSERT)
                            .imageUrl("https://images.unsplash.com/photo-1572490122746-778917f9172c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHBpZXxlbnwwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .build()
            );

            for (MenuItemDto item : menuItems) {
                menuService.createMenuItem(item);
            }
        }
    }

    private void seedEvents() {
        if (eventService.getAllEvents().isEmpty()) {
            List<EventDto> events = Arrays.asList(
                    EventDto.builder()
                            .name("Live Music Night")
                            .description("Enjoy a night of live music with local artists. Featuring genres from jazz to rock.")
                            .date(LocalDate.now().plusDays(7))
                            .time(LocalTime.of(19, 0))
                            .imageUrl("https://images.unsplash.com/photo-1514525253161-7a444188110b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBuaWdodHxlbnwwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .active(true)
                            .build(),
                    EventDto.builder()
                            .name("Trivia Challenge")
                            .description("Test your knowledge and win prizes! Teams of up to 4 welcome.")
                            .date(LocalDate.now().plusDays(14))
                            .time(LocalTime.of(18, 30))
                            .imageUrl("https://images.unsplash.com/photo-1523875194686-216960309995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHx0cml2aWElMjBjaGFsbGVuZ2V8ZW5wwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .active(true)
                            .build(),
                    EventDto.builder()
                            .name("Karaoke Night")
                            .description("Sing your heart out with friends! All genres and skill levels welcome.")
                            .date(LocalDate.now().plusDays(21))
                            .time(LocalTime.of(20, 0))
                            .imageUrl("https://images.unsplash.com/photo-1505373877845-8c2aace4d89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxrYXJhb2tlJTIwbmlnaHR8ZW5wwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .active(true)
                            .build(),
                    EventDto.builder()
                            .name("Open Mic Comedy")
                            .description("Laugh out loud with aspiring comedians and seasoned pros. Sign up to perform!")
                            .date(LocalDate.now().plusDays(28))
                            .time(LocalTime.of(19, 30))
                            .imageUrl("https://images.unsplash.com/photo-1523875194686-216960309995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzcxMjl8MHwxfHNlYXJjaHwxfHxjYXJhJTIwbmlnaHR8ZW5wwfHx8fDE3MTY2NDUzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080")
                            .active(true)
                            .build()
            );

            for (EventDto event : events) {
                eventService.createEvent(event);
            }
        }
    }
}