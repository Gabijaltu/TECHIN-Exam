package com.example.items.service;

import com.example.items.model.Item;
import com.example.items.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

  private final ItemRepository itemRepository;

  @Autowired
  public ItemService(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  public List<Item> findAllItems() {
    return itemRepository.findAll();
  }

  public boolean existsItemById(long id) {
    return itemRepository.existsById(id);
  }

  public Optional<Item> findItemById(long id) {
    return itemRepository.findById(id);
  }

  public Item saveItem(Item item) {
    return itemRepository.save(item);
  }

  public void deleteItemById(long id) {
    itemRepository.deleteById(id);
  }

  public boolean existsById(long id) {
    return itemRepository.existsById(id);
  }

  public Item findById(long id) {
    return itemRepository.findById(id).get();
  }

//  public List<Item> findAllItemsByTitleContaining(String title) {
//    return itemRepository.findAllByTitleContaining(title);
//  }

//  public List<Item> findAllItemsByDescription(String description) {
//    return itemRepository.findAllByDescription(description);
//  }

//  public Page<Item> findAllItemsPage(int page, int size, String sort) {
//    if (sort == null) {
//      Pageable pageable = PageRequest.of(page, size);
//
//      return itemRepository.findAll(pageable);
//    }
//
//    Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
//    return itemRepository.findAll(pageable);
//  }
}
