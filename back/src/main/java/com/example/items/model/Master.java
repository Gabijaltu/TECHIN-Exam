package com.example.items.model;

import jakarta.persistence.*;

@Entity
@Table(name = "masters")
public class Master {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;
  private String surname;
  private String specialization;
  private String city;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "service_id")
  private Service service;

  public Master() {
  }

  public Master(String name, String surname, String specialization, String city, Service service) {
    this.name = name;
    this.surname = surname;
    this.specialization = specialization;
    this.city = city;
    this.service = service;
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

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public String getSpecialization() {
    return specialization;
  }

  public void setSpecialization(String specialization) {
    this.specialization = specialization;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public Service getService() {
    return service;
  }

  public void setService(Service service) {
    this.service = service;
  }
}
