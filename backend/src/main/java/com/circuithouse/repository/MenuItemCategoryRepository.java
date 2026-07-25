package com.circuithouse.repository;

import com.circuithouse.model.MenuItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MenuItemCategoryRepository extends JpaRepository<MenuItemCategory, UUID> {
    Optional<MenuItemCategory> findByName(String name);
}