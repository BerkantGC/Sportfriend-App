package com.GameSatis.backend.controller;


import com.GameSatis.backend.dto.SellersDto;
import com.GameSatis.backend.model.Sellers;
import com.GameSatis.backend.service.SellersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SellerController {
    @Autowired
    private SellersService sellersService;

    @PostMapping("/sellers")
    public ResponseEntity<SellersDto> save(@RequestBody SellersDto sellersDto) throws IOException {
       return ResponseEntity.ok(sellersService.save(sellersDto));
    }

    @PutMapping("/sellers")
    public ResponseEntity<Sellers> update(@RequestBody Sellers sellers)
    {
        System.out.println(sellers);
        return ResponseEntity.ok(sellersService.update(sellers));
    }

    @GetMapping("/sellers")
    public ResponseEntity<List<SellersDto>> showAll(){
        return ResponseEntity.ok(sellersService.getAll());
    }
}
