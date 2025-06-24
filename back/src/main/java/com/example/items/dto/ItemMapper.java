package com.example.items.dto;


import com.example.items.model.Item;

public class ItemMapper {


  public static ItemResponseDTO toItemResponseDTO(Item item) {
    CategoryDTO categoryDTO = null;
    if (item.getCategories() != null) {
      categoryDTO = new CategoryDTO(item.getCategories().getId(), item.getCategories().getName());
    }
    return new ItemResponseDTO(
            item.getId(),
            item.getTitle(),
            item.getDescription(),
            item.getCity(),
            item.getPrice(),
            categoryDTO
    );
  }
}
