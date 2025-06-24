package com.example.items.dto;


import com.example.items.model.Book;

public class BookMapper {

  public static BookResponseDTO toBookResponseDTO(Book book) {
    return new BookResponseDTO(book.getTitle(), book.getAuthor(), book.getImage(), book.getCategories());
  }
}
