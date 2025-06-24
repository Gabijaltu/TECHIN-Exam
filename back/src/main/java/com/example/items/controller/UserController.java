package com.example.items.controller;

import com.example.items.dto.LoginResponseDTO;
import com.example.items.dto.UserMapper;
import com.example.items.dto.UserRequestDTO;
import com.example.items.model.Role;
import com.example.items.model.User;
import com.example.items.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserController(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/auth/register")
  public ResponseEntity<?> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
    User user = new User();
    user.setUsername(userRequestDTO.username());
    user.setPassword(passwordEncoder.encode(userRequestDTO.password()));
    user.setRoles(List.of(new Role(1)));
    userService.saveUser(user);

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(user.getId())
                    .toUri())
            .body(UserMapper.toUserResponseDTO(user));
  }

  @GetMapping("/auth/me")
  public ResponseEntity<LoginResponseDTO> me(Authentication authentication) {
    User user = (User) authentication.getPrincipal();

    return ResponseEntity.ok(UserMapper.toLoginResponseDTO(user));
  }

}
