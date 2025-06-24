package com.example.items.repository;

import com.example.items.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BookRepository extends JpaRepository<Book, Long> {
  List<Book> findAllByTitleContaining(String title);

  List<Book> findAllByTitle(String title);

  List<Book> findAllByAuthor(String author);
}
