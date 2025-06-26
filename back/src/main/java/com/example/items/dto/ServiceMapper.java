package com.example.items.dto;

import com.example.items.model.Master;
import com.example.items.model.Service;

import java.util.List;
import java.util.stream.Collectors;

public class ServiceMapper {

  public static MasterDTO toMasterDTO(Master master) {
    return new MasterDTO(
            master.getId(),
            master.getName(),
            master.getSurname(),
            master.getSpecialization(),
            master.getCity()
    );
  }

  public static ServiceResponseDTO toServiceResponseDTO(Service service) {
    List<MasterDTO> masters = service.getMasters() == null
            ? List.of()
            : service.getMasters().stream()
            .map(ServiceMapper::toMasterDTO)
            .collect(Collectors.toList());

    return new ServiceResponseDTO(
            service.getId(),
            service.getTitle(),
            service.getAddress(),
            service.getManager(),
            masters
    );
  }

  public static Service toService(ServiceRequestDTO serviceRequestDTO) {
    Service service = new Service();
    service.setTitle(serviceRequestDTO.title());
    service.setAddress(serviceRequestDTO.address());
    service.setManager(serviceRequestDTO.manager());

    if (serviceRequestDTO.masters() != null) {
      List<Master> masters = serviceRequestDTO.masters().stream()
              .map(mdto -> {
                Master master = new Master();
                master.setName(mdto.name());
                master.setSurname(mdto.surname());
                master.setSpecialization(mdto.specialization());
                master.setCity(mdto.city());
                master.setService(service); // nustatome dvipusį ryšį
                return master;
              })
              .collect(Collectors.toList());
      service.setMasters(masters);
    }

    return service;
  }

  public static void updateServiceFromDTO(Service service, ServiceRequestDTO dto) {
    if (dto.title() != null) service.setTitle(dto.title());
    if (dto.address() != null) service.setAddress(dto.address());
    if (dto.manager() != null) service.setManager(dto.manager());

    if (dto.masters() != null) {
      // Išvalom senus masters, priskiriam naujus
      service.getMasters().clear();

      List<Master> masters = dto.masters().stream()
              .map(m -> {
                Master master = new Master();
                master.setName(m.name());
                master.setSurname(m.surname());
                master.setSpecialization(m.specialization());
                master.setCity(m.city());
                master.setService(service);
                return master;
              })
              .collect(Collectors.toList());
      service.getMasters().addAll(masters);
    }
  }
}
