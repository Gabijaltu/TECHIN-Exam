package com.example.items.controller;

import com.example.items.dto.ItemMapper;
import com.example.items.dto.ItemRequestDTO;
import com.example.items.dto.ItemResponseDTO;
import com.example.items.model.Item;
import com.example.items.model.Category;
import com.example.items.service.CategoryService;
import com.example.items.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/item")
public class ItemController {

  private final ItemService itemService;
  private final CategoryService categoryService;

  @Autowired
  public ItemController(ItemService itemService, CategoryService categoryService) {
    this.itemService = itemService;
    this.categoryService = categoryService;
  }

  @GetMapping
  public ResponseEntity<List<ItemResponseDTO>> getAds() {
    List<Item> items = itemService.findAllItems();
    List<ItemResponseDTO> dtos = items.stream()
            .map(ItemMapper::toItemResponseDTO)
            .toList();
    return ResponseEntity.ok(dtos);
  }

  @PostMapping
  public ResponseEntity<?> createItem(@Valid @RequestBody ItemRequestDTO itemRequestDTO) {
    Item item = new Item();
    item.setTitle(itemRequestDTO.title());
    item.setDescription(itemRequestDTO.description());
    item.setCity(itemRequestDTO.city());
    item.setPrice(itemRequestDTO.price());
    item.setCategories(categoryService.saveCategory(new Category(itemRequestDTO.category())));
    itemService.saveItem(item);
    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(item.getId())
                    .toUri())
            .body(ItemMapper.toItemResponseDTO(item));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateItem(@PathVariable long id, @Valid @RequestBody ItemRequestDTO itemRequestDTO) {
    if (!itemService.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    Item itemFromDB = itemService.findById(id);
    itemFromDB.setTitle(itemRequestDTO.title());
    itemFromDB.setDescription(itemRequestDTO.description());
    itemFromDB.setCategories(itemRequestDTO.category().isEmpty() ? itemFromDB.getCategories() : categoryService.saveCategory(new Category(itemRequestDTO.category())));
    itemFromDB.setPrice(Objects.equals(itemRequestDTO.price(), BigDecimal.ZERO) ? itemFromDB.getPrice() : itemRequestDTO.price());
    itemFromDB.setCity(itemRequestDTO.city().isEmpty() ? itemFromDB.getCity() : itemRequestDTO.city());
    itemService.saveItem(itemFromDB);
    return ResponseEntity.status(HttpStatus.OK).body(ItemMapper.toItemResponseDTO(itemFromDB));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteItem(@PathVariable long id) {
    if (!itemService.existsItemById(id)) {
      return ResponseEntity.notFound().build();
    }
    itemService.deleteItemById(id);
    return ResponseEntity.noContent().build();
  }
}

