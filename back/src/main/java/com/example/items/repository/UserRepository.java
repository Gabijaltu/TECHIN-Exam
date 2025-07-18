package com.example.items.repository;

import com.example.items.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findUserByUsername(String username);

  boolean existsByUsername(String username);


}
