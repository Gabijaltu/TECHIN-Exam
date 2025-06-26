package com.example.items.repository;

import com.example.items.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {

  boolean existsByTitle(String title);

}
