package com.example.items.service;

import com.example.items.model.Category;
import com.example.items.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public Category saveCategory(Category category) {
    return categoryRepository.save(category);
  }

  public boolean existsAdById(long id) {
    return categoryRepository.existsById(id);
  }

  public void deleteAdById(long id) {
    categoryRepository.deleteById(id);
  }

  public boolean existsByName(String name) {
    return categoryRepository.existsByName(name);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }
}
