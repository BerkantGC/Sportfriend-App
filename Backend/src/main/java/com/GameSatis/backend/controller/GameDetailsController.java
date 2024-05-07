package com.GameSatis.backend.controller;

import com.GameSatis.backend.model.GameDetails;
import com.GameSatis.backend.service.GameDetailsService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GameDetailsController {
    @Autowired
    private GameDetailsService gameDetailsService;

    @GetMapping("/sport-details/{id}")
    @ResponseBody
    public ResponseEntity<GameDetails> showAll(@PathVariable Integer id){
        return ResponseEntity.ok(gameDetailsService.getByID(id));
    }

    @PostMapping("/sport-details")
    public ResponseEntity<GameDetails> saveDetail(@RequestBody GameDetails detail){
        return ResponseEntity.ok(gameDetailsService.saveGameDetail(detail));
    }
}
