package com.example.items.model;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Entity
@Table(name = "books") // Jei to neparašysiu, lentelė bus traktuojama kaip „book“
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // SQL kode, tai yra AUTO_INCREMENT
  private long id; // Duomenų bazėje: BIGINT

  private String title; // Duomenų bazėje: VARCHAR
  private String author; // VARCHAR
  private String image;

  // Čia CascadeType.ALL nerašyti. Nepakeis vaikinės lentelės - tik kvies
  // egzistuojantį id
  @ManyToMany
  @JoinTable(
          name = "books_categories",
          joinColumns = @JoinColumn(name = "book_id"),
          inverseJoinColumns = @JoinColumn(name = "category_id"))
  private List<Category> categories;


  // id nereikia, nes jis generuojamas
  @Autowired
  public Book(String title, String author, List<Category> categories, String image) {
    this.title = title;
    this.author = author;
    this.image = image;
    this.categories = categories;
  }

  // Konstruktorius be argumentų yra reikalingas,
  // tam kad Hibernate galėtų veikti
  public Book() {

  }

  public void setId(long id) {
    this.id = id;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  // getId() reikalingas, kad Jackson galėtu serialize/
  // deserialize id
  public long getId() {
    return id;
  }

  public List<Category> getCategories() {
    return categories;
  }

  public void setCategories(List<Category> categories) {
    this.categories = categories;
  }
}


//@Entity
//@Table(name = "items")
//public class Item {
//  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  private long id;
//  private String name;
//  @ManyToMany
//  @JoinTable(
//          name = "items_categories",
//          joinColumns = @JoinColumn(name = "item_id"),
//          inverseJoinColumns = @JoinColumn(name = "category_id")
//  )
//  private List<ItemCategory> categories;
//  @Enumerated(EnumType.STRING)
//  @Column(name = "category")
//  private TripCategory category;
//  private String image;
//  private String duration;
//  private BigDecimal price;
//  @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
//
//
//  public Item(String name, TripCategory category, String image, String duration, BigDecimal price) {
//    this.name = name;
//    this.category = category;
//    this.image = image;
//    this.duration = duration;
//    this.price = price;
//    this.tripDates = new ArrayList<>();
////  }
//
//  public Item() {
//  }

