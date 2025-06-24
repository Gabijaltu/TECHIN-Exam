//package com.example.items.dto;
//
//import lt.techin.server.egzaminas.model.Item;
//import lt.techin.server.egzaminas.model.TripDate;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//public class TripMapper {
//
//  public static ItemResponseDTO toTripResponseDTO(Item item, BigDecimal average) {
//    String dates = String.join(", ", item.getTripDates().stream().map(tripDate -> tripDate.getDate().toString()).toList());
//
//    return new ItemResponseDTO(item.getId(), item.getName(), item.getCategory().name(), item.getImage(), item.getDuration(), item.getPrice(), !item.getTripDates().isEmpty(), average, dates);
//  }
//
//  public static TripResponseDTONoRating toTripResponseDTONoRating(Item item) {
//    String dates = String.join(", ", item.getTripDates().stream().map(tripDate -> tripDate.getDate().toString()).toList());
//    return new TripResponseDTONoRating(item.getId(), item.getName(), item.getCategory().name(), item.getImage(), item.getDuration(), item.getPrice(), !item.getTripDates().isEmpty(), dates);
//  }
//
//  public static List<TripResponseDTONoRating> toTripResponseDTOList(List<Item> items) {
//    return items.stream().map(item -> toTripResponseDTONoRating(item)).toList();
//  }
//
//  public static AvailableDatesResponseDTO toAvailableDateResponseDTO(TripDate tripDate) {
//    return new AvailableDatesResponseDTO(tripDate.getId(), tripDate.getTrip().getName(), tripDate.getDate());
//  }
//
//  public static List<AvailableDatesResponseDTO> availableDatesResponseDTOList(List<TripDate> tripDates) {
//    return tripDates.stream().map(TripMapper::toAvailableDateResponseDTO).toList();
//  }
//
//  public static CategoryResponseDTO toCategoryResponseDTO(Item item) {
//    return new CategoryResponseDTO(item.getCategory().name().toLowerCase());
//  }
//
//  public static List<CategoryResponseDTO> toCategoryResponseDTOList(List<Item> items) {
//    return items.stream().map(TripMapper::toCategoryResponseDTO).toList();
//  }
//
//}
