package com.example.items.controller;

import com.example.items.dto.ServiceMapper;
import com.example.items.dto.ServiceRequestDTO;
import com.example.items.dto.ServiceResponseDTO;
import com.example.items.model.Service;
import com.example.items.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

  private final ServiceService serviceService;

  @Autowired
  public ServiceController(ServiceService serviceService) {
    this.serviceService = serviceService;
  }

  @GetMapping
  public ResponseEntity<List<ServiceResponseDTO>> getAllServices() {
    List<Service> services = serviceService.getAllServices();
    List<ServiceResponseDTO> dtoList = services.stream()
            .map(ServiceMapper::toServiceResponseDTO)
            .collect(Collectors.toList());
    return ResponseEntity.ok(dtoList);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ServiceResponseDTO> getServiceById(@PathVariable long id) {
    return serviceService.getServiceById(id)
            .map(ServiceMapper::toServiceResponseDTO)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateService(@PathVariable long id, @Valid @RequestBody ServiceRequestDTO serviceRequestDTO) {
    return serviceService.findOptionalById(id).map(serviceFromDB -> {
      ServiceMapper.updateServiceFromDTO(serviceFromDB, serviceRequestDTO);
      serviceService.saveService(serviceFromDB);
      return ResponseEntity.ok(ServiceMapper.toServiceResponseDTO(serviceFromDB));
    }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PostMapping
  public ResponseEntity<?> addService(@Valid @RequestBody ServiceRequestDTO serviceRequestDTO) {
    if (serviceRequestDTO.title() == null || serviceRequestDTO.title().trim().isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Title cannot be empty");
    }

    if (serviceService.existsByTitle(serviceRequestDTO.title())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Service already exists");
    }

    Service serviceToSave = ServiceMapper.toService(serviceRequestDTO);
    Service savedService = serviceService.saveService(serviceToSave);

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedService.getId())
                            .toUri())
            .body(ServiceMapper.toServiceResponseDTO(savedService));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteService(@PathVariable long id) {
    if (!serviceService.existsServiceById(id)) {
      return ResponseEntity.notFound().build();
    }
    serviceService.deleteServiceById(id);
    return ResponseEntity.noContent().build();
  }
}
