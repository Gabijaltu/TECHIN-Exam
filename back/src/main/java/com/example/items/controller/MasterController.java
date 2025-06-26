package com.example.items.controller;

import com.example.items.model.Master;
import com.example.items.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/masters")
public class MasterController {

  private final MasterService masterService;

  @Autowired
  public MasterController(MasterService masterService) {
    this.masterService = masterService;
  }

  @GetMapping
  public ResponseEntity<List<Master>> getMasters() {
    List<Master> masters = masterService.findAllMasters();
    return ResponseEntity.ok(masters);
  }

  @PostMapping
  public ResponseEntity<?> createMaster(@RequestBody Master master, long id) {
    if (master.getName().isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("name cannot be empty");
    }

    if (masterService.existsByName(master.getName())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Master already exists");
    }

    Master savedMaster = masterService.saveMaster(master);

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedMaster.getId())
                            .toUri())
            .body(savedMaster);
  }


  @DeleteMapping("/categories/{id}")
  public ResponseEntity<Void> deleteMaster(@PathVariable long id) {
    if (!masterService.existsMasterById(id)) {
      return ResponseEntity.notFound().build();
    }
    masterService.deleteMasterById(id);
    return ResponseEntity.noContent().build();
  }
}
