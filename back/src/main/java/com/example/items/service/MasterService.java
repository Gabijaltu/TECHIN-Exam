package com.example.items.service;

import com.example.items.model.Master;
import com.example.items.repository.MasterRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class MasterService {

  private final MasterRepository masterRepository;

  public MasterService(MasterRepository masterRepository) {
    this.masterRepository = masterRepository;
  }

  public Optional<Master> findById(long id) {
    return masterRepository.findById(id);
  }

  public List<Master> findAllMasters() {
    return masterRepository.findAll();
  }

  public boolean existsById(long id) {
    return masterRepository.existsById(id);
  }

  public Master saveMaster(Master master) {
    return masterRepository.save(master);
  }

  public Optional<Master> findOptionalById(long id) {
    return masterRepository.findById(id);
  }

  public void deleteById(long id) {
    masterRepository.deleteById(id);
  }

  public boolean existsByName(String name) {
    return masterRepository.existsByName(name);
  }

  public boolean existsMasterById(long id) {
    return masterRepository.existsById(id);
  }

  public void deleteMasterById(long id) {
    masterRepository.deleteById(id);
  }
}
