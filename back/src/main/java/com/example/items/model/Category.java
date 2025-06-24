package com.example.items.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "categories")
public class Category {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String name;

  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Item> items;


  public Category(String name) {
    this.name = name;
    this.items = List.of();
  }

  public Category() {
  }

  public List<Item> getAds() {
    return items;
  }

  public void setAds(List<Item> items) {
    this.items = items;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

