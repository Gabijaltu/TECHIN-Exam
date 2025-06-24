package com.example.items.service;

import com.example.items.model.Category;
import com.example.items.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public Category saveCategory(Category category) {
    return categoryRepository.save(category);
  }
}
