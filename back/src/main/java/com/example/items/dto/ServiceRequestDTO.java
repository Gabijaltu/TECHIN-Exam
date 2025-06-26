package com.example.items.dto;

import java.util.List;

public record ServiceRequestDTO(
        String title,
        String address,
        String manager,
        List<MasterDTO> masters
) {
}
