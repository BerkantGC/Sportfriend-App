package com.GameSatis.backend.service;

import com.GameSatis.backend.model.Favorites;
import com.GameSatis.backend.model.Games;
import com.GameSatis.backend.model.RoleModel;
import com.GameSatis.backend.model.UserModel;
import com.GameSatis.backend.repository.FavoritesRepository;
import com.GameSatis.backend.repository.GamesRepository;
import com.GameSatis.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FavoritesRepository favoritesRepository;
    @Autowired
    private GamesRepository gamesRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private Favorites handleGetFavorites(UserModel gotUserModel){
        List<Games> gamesList = new ArrayList<>();
        Favorites favorites = new Favorites();

        if(gotUserModel.getFavorites() != null) {
            {
                gotUserModel.getFavorites().getFavoriteGames().forEach(item -> {
                    Games tmpGame = new Games();
                    tmpGame.setId(item.getId());
                    tmpGame.setGameName(item.getGameName());
                    tmpGame.setGameYear(item.getGameYear());
                    tmpGame.setImageUrl(item.getImageUrl());
                    tmpGame.setSeller_id(item.getSeller_id());
                    if(gotUserModel.getFavorites() !=null)
                        tmpGame.setFavoriteId(item.getFavoriteId());
                    tmpGame.setUserIds(item.getUserIds());
                    gamesList.add(tmpGame);
                });
            }
        }
        favorites.setFavoriteGames(gamesList);
        favorites.setId(gotUserModel.getFavorites().getId());
        return favorites;
    }
    public UserModel getAll(String id){
        UserModel gotUserModel = userRepository.findByUsername(id);

        UserModel userModel = new UserModel();

        if(gotUserModel.getFavorites() != null) {
            Favorites favorites = handleGetFavorites(gotUserModel);
            userModel.setFavorites(favorites);
        }

        userModel.setUser_id(gotUserModel.getUser_id());
        userModel.setEmail(gotUserModel.getEmail());
        userModel.setBlocked(gotUserModel.getBlocked());
        userModel.setPassword(passwordEncoder.encode(gotUserModel.getPassword()));
        userModel.setRoles(gotUserModel.getRoles().stream().collect(Collectors.toList()));
        userModel.setUsername(gotUserModel.getUsername());

        return userModel;
    }

    public UserModel saveUser(UserModel userModel){
        UserModel userToSave = new UserModel();

        userToSave.setUsername(userModel.getUsername());
        userToSave.setPassword(passwordEncoder.encode(userModel.getPassword()));
        userToSave.setEmail(userModel.getEmail());
        userToSave.setBlocked(userModel.getBlocked());

        List<RoleModel> roleModelList =new ArrayList<>();
        userModel.getRoles().forEach(item->{
            RoleModel roleModel = new RoleModel();
            roleModel.setRoleName(item.getRoleName());
            roleModelList.add(roleModel);
        });
        userToSave.setRoles(roleModelList);
        userToSave.setUser_id(userRepository.save(userToSave).getUser_id());
        return userToSave;
    }

    public UserModel addFavorite(UserModel userModel)
    {
        UserModel userToUpdate = userRepository.findByUsername(userModel.getUsername());

        Favorites favorites = new Favorites();
        List<Games> gamesList = new ArrayList<>();

        if(userModel.getFavorites()!= null){
            userModel.getFavorites().getFavoriteGames().forEach(item ->{
                Games tmpGame = gamesRepository.findByGameName(item.getGameName());

                if(tmpGame.getUserIds()!=null && tmpGame.getUserIds() != "") {
                    String userIds = new String();
                    userIds = tmpGame.getUserIds() + ", " + userToUpdate.getUser_id().toString();
                    tmpGame.setUserIds(userIds);
                }
                else tmpGame.setUserIds(userToUpdate.getUser_id().toString());

                if(userToUpdate.getFavorites() == null)
                {
                    favorites.setId(userModel.getUser_id());
                    tmpGame.setFavoriteId(userModel.getUser_id());
                }
                else {
                    favorites.setId(userToUpdate.getFavorites().getId());
                    tmpGame.setFavoriteId(userToUpdate.getFavorites().getId());
                }
                gamesList.add(tmpGame);
            });
        }

        System.out.println(userToUpdate.getFavorites());
        if(userToUpdate.getFavorites() != null)
        {
            userToUpdate.getFavorites().getFavoriteGames().forEach(item->{
                gamesList.add(item);
            });
        }
        gamesRepository.saveAll(gamesList);
        favorites.setFavoriteGames(gamesList);
        favoritesRepository.save(favorites);
        userToUpdate.setFavorites(favorites);
        userRepository.save(userToUpdate);
        return userToUpdate;
    }

    public UserModel changePassword(String username, String oldPassword, String newPassword){
        UserModel userToChange = userRepository.findByUsername(username);

        boolean isMatch = passwordEncoder.matches(oldPassword,userToChange.getPassword());

        if(isMatch) {
            userToChange.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(userToChange);
        }

        return null;
    }
}
