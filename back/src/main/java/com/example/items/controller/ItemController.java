//package com.example.items.controller;
//
//import jakarta.validation.Valid;
//import lt.techin.server.egzaminas.dto.*;
//import lt.techin.server.egzaminas.model.*;
//import lt.techin.server.egzaminas.service.TripDateService;
//import lt.techin.server.egzaminas.service.ItemService;
//import lt.techin.server.egzaminas.service.UserTripService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.math.BigDecimal;
//import java.math.RoundingMode;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/items")
//public class ItemController {
//
//  private final ItemService itemService;
//
//  @Autowired
//  public ItemController(ItemService itemService) {
//    this.itemService = itemService;
//  }
//
//  @PostMapping
//  public ResponseEntity<?> createTrip(@Valid @RequestBody ItemRequestDTO itemRequestDTO) {
//
//    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(item.getId()).toUri()).body(TripMapper.toTripResponseDTO(item, BigDecimal.ZERO));
//  }
//
//  @PostMapping("/{tripDateId}/register")
//  public ResponseEntity<UserTripRegistrationDTO> registerForTrip(@PathVariable long tripDateId, Authentication authentication) {
//    if (!tripDateService.existsById(tripDateId)) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }
//    User user = (User) authentication.getPrincipal();
//    if (tripDateService.findTripDateById(tripDateId).get().getUserTrips().stream().anyMatch(userTrip -> userTrip.getUser().getId() == user.getId())) {
//      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//    }
//    TripDate tripForRegistration = tripDateService.findTripDateById(tripDateId).get();
//    UserTrip userTrip = new UserTrip(tripForRegistration, user);
//    userTripService.save(userTrip);
//    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userTrip.getId()).toUri()).body(UserTripMapper.toUserTripResponseDTO(userTrip));
//  }
//
//  @GetMapping
//  public ResponseEntity<List<ItemResponseDTO>> getTrips() {
//    List<Item> items = itemService.findAll();
//    List<ItemResponseDTO> itemResponseDTOList = new ArrayList<>();
//    for (Item item : items) {
//      long tripId = item.getId();
//      String dates = String.join(", ", item.getTripDates().stream().map(tripDate -> tripDate.getDate().toString()).toList());
//
//      BigDecimal totalUsersRegistered = BigDecimal.valueOf(userTripService.findUserTripsByTripId(tripId).stream().filter(userTrip -> userTrip.getRating() != 0).toList().size());
//      BigDecimal sum = userTripService.findUserTripsByTripId(tripId).stream().map(userTrip -> BigDecimal.valueOf(userTrip.getRating())).filter(rating -> rating.compareTo(BigDecimal.ZERO) != 0).reduce(BigDecimal.ZERO, BigDecimal::add);
//      BigDecimal average = totalUsersRegistered.equals(BigDecimal.ZERO) ? BigDecimal.ZERO : sum.divide(totalUsersRegistered, 2, RoundingMode.HALF_UP);
//      itemResponseDTOList.add(new ItemResponseDTO(item.getId(), item.getName(), item.getCategory().name(), item.getImage(), item.getDuration(), item.getPrice(), !item.getTripDates().isEmpty(), average, dates));
//    }
//    return ResponseEntity.status(HttpStatus.OK).body(itemResponseDTOList);
//  }
//
//  @GetMapping("/{itemId}")
//  public ResponseEntity<List<AvailableDatesResponseDTO>> getAvailableDates(@PathVariable long tripId, Authentication authentication) {
//    if (!itemService.existsById(tripId)) {
//      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }
//    User user = (User) authentication.getPrincipal();
//    List<AvailableDatesResponseDTO> tripDates = itemService.findTripById(tripId).get().getTripDates()
//            .stream().filter(tripDate -> tripDate.getUserTrips().stream().filter(userTrip -> userTrip.getUser().getId() == user.getId()).toList().isEmpty())
//            .map(tripDate -> TripMapper.toAvailableDateResponseDTO(tripDate)).toList();
//    return ResponseEntity.status(HttpStatus.OK).body(tripDates);
//  }
//
//}
