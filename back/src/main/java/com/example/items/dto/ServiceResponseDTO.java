package com.example.items.dto;

import java.util.List;

public record ServiceResponseDTO(
        Long id,
        String title,
        String address,
        String manager,
        List<MasterDTO> masters
) {
}
