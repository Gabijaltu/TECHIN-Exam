package com.example.items.dto;

import com.example.items.model.Category;

import java.util.List;

public record BookRequestDTO(String title, String author, String image, List<Category> categories) {


}
