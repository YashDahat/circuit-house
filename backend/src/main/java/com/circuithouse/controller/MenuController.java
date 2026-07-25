package com.circuithouse.controller;

import com.circuithouse.dto.MenuItemDto;
import com.circuithouse.model.MenuItemCategory;
import com.circuithouse.service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<MenuItemDto>> getAllMenuItems() {
        List<MenuItemDto> menuItems = menuService.getAllMenuItems();
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<MenuItemDto> getMenuItemById(@PathVariable UUID id) {
        MenuItemDto menuItem = menuService.getMenuItemById(id);
        return new ResponseEntity<>(menuItem, HttpStatus.OK);
    }

    @GetMapping("/items/category/{categoryName}")
    public ResponseEntity<List<MenuItemDto>> getMenuItemsByCategory(@PathVariable String categoryName) {
        List<MenuItemDto> menuItems = menuService.getMenuItemsByCategory(categoryName);
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<MenuItemCategory>> getAllMenuItemCategories() {
        List<MenuItemCategory> categories = menuService.getAllMenuItemCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}