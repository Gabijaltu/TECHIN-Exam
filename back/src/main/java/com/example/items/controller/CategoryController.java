package com.example.items.controller;

import com.example.items.model.Category;
import com.example.items.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class CategoryController {

  private final CategoryService categoryService;

  // @Autowired nebūtina rašyti ant konstruktoriaus, KAI yra 1 konstruktorius
  // Aš rekomenduoju visada rašyti
  @Autowired
  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @PostMapping("/categories")
  public ResponseEntity<?> addCategory(@RequestBody Category category) {

    if (category.getName().isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name cannot be empty");
    }

    Category savedCategory = categoryService.saveCategory(category);

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedCategory.getId())
                            .toUri())
            .body(savedCategory);
  }
}
