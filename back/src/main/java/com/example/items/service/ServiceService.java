package com.example.items.service;


import com.example.items.model.Service;
import com.example.items.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {

  private final ServiceRepository serviceRepository;

  @Autowired
  public ServiceService(ServiceRepository serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public List<Service> getAllServices() {
    return serviceRepository.findAll();
  }

  public boolean existsByTitle(String title) {
    return serviceRepository.existsByTitle(title);
  }

  public Service saveService(Service service) {
    return serviceRepository.save(service);
  }

  public boolean existsServiceById(long id) {
    return serviceRepository.existsById(id);
  }

  public void deleteServiceById(long id) {
    serviceRepository.deleteById(id);
  }

  public Optional<Service> findOptionalById(Long aLong) {
    return serviceRepository.findById(aLong);
  }

  public Optional<Service> getServiceById(long id) {
    return serviceRepository.findById(id);
  }

  public boolean existsById(long id) {
    return serviceRepository.existsById(id);
  }

  public Optional<Service> findById(long id) {
    return serviceRepository.findById(id);
  }


//  public boolean existsItemById(long id) {
//    return masterRepository.existsById(id);
//  }
//
//  public Optional<Master> findItemById(long id) {
//    return masterRepository.findById(id);
//  }
//
//  public Master saveItem(Master master) {
//    return masterRepository.save(master);
//  }
//
//  public void deleteItemById(long id) {
//    masterRepository.deleteById(id);
//  }
//
//  public boolean existsById(long id) {
//    return masterRepository.existsById(id);
//  }
//
//  public Master findById(long id) {
//    return masterRepository.findById(id).get();
//  }

//  public List<Item> findAllItemsByTitleContaining(String title) {
//    return itemRepository.findAllByTitleContaining(title);
//  }

//  public List<Item> findAllItemsByDescription(String description) {
//    return itemRepository.findAllByDescription(description);
//  }

//  public Page<Item> findAllItemsPage(int page, int size, String sort) {
//    if (sort == null) {
//      Pageable pageable = PageRequest.of(page, size);
//
//      return itemRepository.findAll(pageable);
//    }
//
//    Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
//    return itemRepository.findAll(pageable);
//  }
}
