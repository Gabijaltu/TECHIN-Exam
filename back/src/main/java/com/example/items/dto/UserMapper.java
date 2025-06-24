package com.example.items.dto;


import com.example.items.model.Role;
import com.example.items.model.User;

public class UserMapper {

  public static UserResponseDTO toUserResponseDTO(User user) {
    return new UserResponseDTO(user.getUsername());
  }

  public static LoginResponseDTO toLoginResponseDTO(User user) {
    return new LoginResponseDTO(
            user.getUsername(),
            user.getRoles()
                    .stream()
                    .map(Role::getName)
                    .toList()
    );
  }

}
