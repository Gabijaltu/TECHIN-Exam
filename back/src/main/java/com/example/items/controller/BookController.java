package com.example.items.controller;

import com.example.items.dto.BookMapper;
import com.example.items.dto.BookRequestDTO;
import com.example.items.model.Book;
import com.example.items.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;


@RestController
@RequestMapping("/api/items")
public class BookController {

  // @Autowired // field injection (not recommended)
  private final BookService bookService;

  @Autowired // constructor injection (very good)
  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping
  public ResponseEntity<List<Book>> getBooks() {
    return ResponseEntity.ok(bookService.findAllBooks());
  }

  @PostMapping
  public ResponseEntity<?> createBook(@Valid @RequestBody BookRequestDTO bookRequestDTO) {
    Book book = new Book();
    book.setAuthor(bookRequestDTO.author());
    book.setTitle(bookRequestDTO.title());
    book.setImage(bookRequestDTO.image());
    book.setCategories(bookRequestDTO.categories());

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(book.getId())
                    .toUri())
            .body(BookMapper.toBookResponseDTO(book));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBook(@PathVariable long id) {
    if (!bookService.existsBookById(id)) {
      return ResponseEntity.notFound().build();
    }

    bookService.deleteBookById(id);
    return ResponseEntity.noContent().build();
  }
}

