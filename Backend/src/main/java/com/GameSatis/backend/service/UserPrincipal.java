package com.GameSatis.backend.service;

import com.GameSatis.backend.model.RoleModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> roles;
    private Integer blocked;

    public UserPrincipal(String username, String password, List<RoleModel> roles, Integer blocked) {
        this.username = username;
        this.password = password;
        this.roles = roles.stream().map(role-> new SimpleGrantedAuthority(
                "ROLE_" + role)
                )
                .collect(Collectors.toList());
        this.blocked = blocked;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println(username + password + roles);
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return blocked == 0;
    }

    @Override
    public boolean isAccountNonLocked() {
        return blocked == 0;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return blocked == 0;
    }

    @Override
    public boolean isEnabled() {
        return blocked==0;
    }
}
