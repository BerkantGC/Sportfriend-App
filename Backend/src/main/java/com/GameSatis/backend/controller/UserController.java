package com.GameSatis.backend.controller;

import com.GameSatis.backend.model.ChangePasswordModel;
import com.GameSatis.backend.model.UserModel;
import com.GameSatis.backend.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.List;

@Controller
@Transactional
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;
    private AuthenticationManager authenticationManager;

    @GetMapping("/users/{id}")
    public ResponseEntity<UserModel> getRegister(@PathVariable String id){
        return ResponseEntity.ok(userService.getAll(id));
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserModel user) {//@CurrentUser User user
        String username = user.getUsername();
        System.out.println();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, user.getPassword()));
        return new ResponseEntity<>(username + user.getPassword(), HttpStatus.OK);
    }
    @PutMapping("/add_favorite")
    public ResponseEntity<UserModel> addFavorite(@RequestBody UserModel userModel){

        return ResponseEntity.ok(userService.addFavorite(userModel));
    }

    @PostMapping("/register")
    public ResponseEntity<UserModel> handleRegister(@RequestBody UserModel userModel){
        return ResponseEntity.ok(userService.saveUser(userModel));
    }

    @PutMapping("/change_password")
    public ResponseEntity changePassword(@RequestBody ChangePasswordModel changePasswordModel){
        return ResponseEntity.ok(userService.changePassword(SecurityContextHolder.getContext().getAuthentication().getName(), changePasswordModel.getOldPassword(), changePasswordModel.getNewPassword()));
    }
}
