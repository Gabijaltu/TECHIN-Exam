package com.example.items.dto;


import com.example.items.model.Item;

public class ItemMapper {

  public static ItemResponseDTO toItemResponseDTO(Item item) {
    String category = null;
    if (item.getCategories() != null) {
      category = item.getCategories().getName();
    }
    return new ItemResponseDTO(
            item.getId(),
            item.getTitle(),
            item.getDescription(),
            item.getCity(),
            item.getPrice(),
            category
    );
  }
}
