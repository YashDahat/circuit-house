package com.circuithouse.controller;

import com.circuithouse.dto.MenuItemCategoryDto;
import com.circuithouse.dto.MenuItemDto;
import com.circuithouse.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menus")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<MenuItemDto>> getAllMenuItems() {
        List<MenuItemDto> menuItems = menuService.getAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/items/category/{categoryId}")
    public ResponseEntity<List<MenuItemDto>> getMenuItemsByCategory(@PathVariable Long categoryId) {
        List<MenuItemDto> menuItems = menuService.getMenuItemsByCategory(categoryId);
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<MenuItemCategoryDto>> getAllMenuItemCategories() {
        List<MenuItemCategoryDto> categories = menuService.getAllMenuItemCategories();
        return ResponseEntity.ok(categories);
    }
}