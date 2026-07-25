package com.circuithouse.service;

import com.circuithouse.dto.MenuItemDto;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.MenuItem;
import com.circuithouse.model.MenuItemCategory;
import com.circuithouse.repository.MenuItemCategoryRepository;
import com.circuithouse.repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
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
        return menuItemRepository.findByActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemDto> getMenuItemsByCategory(String categoryName) {
        MenuItemCategory category = menuItemCategoryRepository.findByName(categoryName)
                .orElseThrow(() -> new IllegalArgumentException("Category not found: " + categoryName));
        return menuItemRepository.findByActiveTrueAndCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(UUID id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return convertToDto(menuItem);
    }

    public List<MenuItemCategory> getAllMenuItemCategories() {
        return menuItemCategoryRepository.findAll();
    }

    @Transactional
    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItemCategory category = menuItemCategoryRepository.findByName(menuItemDto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("Category not found: " + menuItemDto.getCategoryName()));

        MenuItem menuItem = convertToEntity(menuItemDto, category);
        menuItem.setId(UUID.randomUUID()); // Ensure new ID for creation
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToDto(savedMenuItem);
    }

    @Transactional
    public MenuItemDto updateMenuItem(UUID id, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        MenuItemCategory category = menuItemCategoryRepository.findByName(menuItemDto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("Category not found: " + menuItemDto.getCategoryName()));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setCategory(category);
        existingMenuItem.setActive(menuItemDto.getActive());

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDto(updatedMenuItem);
    }

    @Transactional
    public void deleteMenuItem(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    @Transactional
    public MenuItemCategory createMenuItemCategory(MenuItemCategory category) {
        return menuItemCategoryRepository.save(category);
    }

    @Transactional
    public MenuItemCategory updateMenuItemCategory(UUID id, MenuItemCategory category) {
        MenuItemCategory existingCategory = menuItemCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item category not found with id: " + id));

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        return menuItemCategoryRepository.save(existingCategory);
    }

    @Transactional
    public void deleteMenuItemCategory(UUID id) {
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
                .categoryName(menuItem.getCategory().getName())
                .active(menuItem.isActive())
                .build();
    }

    private MenuItem convertToEntity(MenuItemDto menuItemDto, MenuItemCategory category) {
        return new MenuItem(
                menuItemDto.getId(),
                menuItemDto.getName(),
                menuItemDto.getDescription(),
                menuItemDto.getPrice(),
                menuItemDto.getImageUrl(),
                category,
                menuItemDto.getActive()
        );
    }
}