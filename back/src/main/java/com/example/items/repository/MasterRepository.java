package com.example.items.repository;

import com.example.items.model.Master;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MasterRepository extends JpaRepository<Master, Long> {
  boolean existsByName(String name);
}
