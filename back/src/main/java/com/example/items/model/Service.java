package com.example.items.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "services")
public class Service {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String title;
  private String address;
  private String manager;

  @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Master> masters;

  public Service() {
  }

  public Service(String title, String address, String manager, List<Master> masters) {
    this.title = title;
    this.address = address;
    this.manager = manager;
    this.masters = masters;
  }

  public long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getManager() {
    return manager;
  }

  public void setManager(String manager) {
    this.manager = manager;
  }

  public List<Master> getMasters() {
    return masters;
  }

  public void setMasters(List<Master> masters) {
    this.masters = masters;
  }
}
