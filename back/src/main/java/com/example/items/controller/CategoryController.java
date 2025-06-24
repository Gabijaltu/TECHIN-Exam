package com.example.items.controller;

import com.example.items.model.Category;
import com.example.items.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

  private final CategoryService categoryService;

  @Autowired
  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping("/categories")
  public ResponseEntity<List<Category>> getAllCategories() {
    List<Category> categories = categoryService.getAllCategories();
    return ResponseEntity.ok(categories);
  }

  @PostMapping("/categories")
  public ResponseEntity<?> addCategory(@RequestBody Category category, long id) {

    if (category.getName().isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name cannot be empty");
    }

    if (categoryService.existsByName(category.getName())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Category already exists");
    }

    Category savedCategory = categoryService.saveCategory(category);

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedCategory.getId())
                            .toUri())
            .body(savedCategory);
  }

  @PutMapping("/categories/{id}")


  @DeleteMapping("/categories/{id}")
  public ResponseEntity<Void> deleteCategory(@PathVariable long id) {
    if (!categoryService.existsAdById(id)) {
      return ResponseEntity.notFound().build();
    }
    categoryService.deleteAdById(id);
    return ResponseEntity.noContent().build();
  }

}
