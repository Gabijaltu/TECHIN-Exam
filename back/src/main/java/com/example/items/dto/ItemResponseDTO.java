package com.example.items.dto;

import java.math.BigDecimal;

public record ItemResponseDTO(Long id, String title, String description, String city,
                            BigDecimal price,
                            CategoryDTO category) {


}
