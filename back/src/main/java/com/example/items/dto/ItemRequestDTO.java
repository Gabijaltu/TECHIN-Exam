package com.example.items.dto;

import java.math.BigDecimal;

public record ItemRequestDTO(String title, String description, String city, BigDecimal price,
                           String category) {


}
