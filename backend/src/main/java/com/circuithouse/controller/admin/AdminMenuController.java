package com.circuithouse.controller.admin;

import com.circuithouse.dto.MenuItemCategoryDto;
import com.circuithouse.dto.MenuItemDto;
import com.circuithouse.service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/menus")
public class AdminMenuController {

    private final MenuService menuService;

    public AdminMenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/items")
    public ResponseEntity<MenuItemDto> createMenuItem(@RequestBody MenuItemDto menuItemDto) {
        MenuItemDto createdMenuItem = menuService.createMenuItem(menuItemDto);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<MenuItemDto> updateMenuItem(@PathVariable Long id, @RequestBody MenuItemDto menuItemDto) {
        MenuItemDto updatedMenuItem = menuService.updateMenuItem(id, menuItemDto);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/categories")
    public ResponseEntity<MenuItemCategoryDto> createMenuItemCategory(@RequestBody MenuItemCategoryDto categoryDto) {
        MenuItemCategoryDto createdCategory = menuService.createMenuItemCategory(categoryDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<MenuItemCategoryDto> updateMenuItemCategory(@PathVariable Long id, @RequestBody MenuItemCategoryDto categoryDto) {
        MenuItemCategoryDto updatedCategory = menuService.updateMenuItemCategory(id, categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteMenuItemCategory(@PathVariable Long id) {
        menuService.deleteMenuItemCategory(id);
        return ResponseEntity.noContent().build();
    }
}