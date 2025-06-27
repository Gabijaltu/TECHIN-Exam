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
}
