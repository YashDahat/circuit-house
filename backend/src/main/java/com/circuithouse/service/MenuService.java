package com.circuithouse.service;

import com.circuithouse.dto.MenuItemCategoryDto;
import com.circuithouse.dto.MenuItemDto;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.MenuItem;
import com.circuithouse.model.MenuItemCategory;
import com.circuithouse.repository.MenuItemCategoryRepository;
import com.circuithouse.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;

    public MenuService(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
    }

    public List<MenuItemDto> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemDto> getMenuItemsByCategory(Long categoryId) {
        return menuItemRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemCategoryDto> getAllMenuItemCategories() {
        return menuItemCategoryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItem menuItem = convertToEntity(menuItemDto);
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToDto(savedMenuItem);
    }

    public MenuItemDto updateMenuItem(Long id, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        MenuItemCategory category = menuItemCategoryRepository.findById(menuItemDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + menuItemDto.getCategoryId()));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setCategory(category);

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDto(updatedMenuItem);
    }

    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    public MenuItemCategoryDto createMenuItemCategory(MenuItemCategoryDto categoryDto) {
        MenuItemCategory category = convertToEntity(categoryDto);
        MenuItemCategory savedCategory = menuItemCategoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public MenuItemCategoryDto updateMenuItemCategory(Long id, MenuItemCategoryDto categoryDto) {
        MenuItemCategory existingCategory = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));

        existingCategory.setName(categoryDto.getName());
        existingCategory.setDescription(categoryDto.getDescription());

        MenuItemCategory updatedCategory = menuItemCategoryRepository.save(existingCategory);
        return convertToDto(updatedCategory);
    }

    public void deleteMenuItemCategory(Long id) {
        if (!menuItemCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item category not found with id: " + id);
        }
        menuItemCategoryRepository.deleteById(id);
    }

    private MenuItemDto convertToDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .categoryId(menuItem.getCategory().getId())
                .build();
    }

    private MenuItem convertToEntity(MenuItemDto menuItemDto) {
        MenuItem menuItem = new MenuItem();
        menuItem.setId(menuItemDto.getId());
        menuItem.setName(menuItemDto.getName());
        menuItem.setDescription(menuItemDto.getDescription());
        menuItem.setPrice(menuItemDto.getPrice());
        menuItem.setImageUrl(menuItemDto.getImageUrl());
        if (menuItemDto.getCategoryId() != null) {
            MenuItemCategory category = menuItemCategoryRepository.findById(menuItemDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + menuItemDto.getCategoryId()));
            menuItem.setCategory(category);
        }
        return menuItem;
    }

    private MenuItemCategoryDto convertToDto(MenuItemCategory category) {
        return MenuItemCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    private MenuItemCategory convertToEntity(MenuItemCategoryDto categoryDto) {
        MenuItemCategory category = new MenuItemCategory();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return category;
    }
}