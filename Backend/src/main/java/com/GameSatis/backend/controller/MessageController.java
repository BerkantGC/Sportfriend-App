package com.GameSatis.backend.controller;

import com.GameSatis.backend.model.MessageData;
import com.GameSatis.backend.service.MessagesDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {

    @Autowired
    private MessagesDataService messageService;

    @PostMapping("/message-data")
    public ResponseEntity<MessageData> saveMessage(@RequestBody MessageData messageData){
        return ResponseEntity.ok(messageService.saveMessage(messageData));
    }

    @GetMapping("/message-data/{name}")
    public ResponseEntity<List<MessageData>> getMessages(@PathVariable String name){
        return ResponseEntity.ok(messageService.getAllMessages(name, SecurityContextHolder.getContext().getAuthentication().getName()));
    }
}
