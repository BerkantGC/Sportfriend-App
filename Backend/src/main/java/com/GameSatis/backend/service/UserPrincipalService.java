package com.GameSatis.backend.service;

import com.GameSatis.backend.model.UserModel;
import com.GameSatis.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserPrincipalService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = userRepository.findByUsername(username);
        return new UserPrincipal(userModel.getUsername(),
                userModel.getPassword(),
                userModel.getRoles(),
                userModel.getBlocked());
    }
}
