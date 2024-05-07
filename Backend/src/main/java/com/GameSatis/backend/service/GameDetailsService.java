package com.GameSatis.backend.service;

import com.GameSatis.backend.model.GameDetails;
import com.GameSatis.backend.repository.GameDetailsRepository;
import com.GameSatis.backend.repository.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameDetailsService {
    @Autowired
    private GameDetailsRepository gameDetailsRepository;
    @Autowired
    private GamesRepository gamesRepository;

    public GameDetails saveGameDetail(GameDetails gameDetails){
        GameDetails toSave = new GameDetails();
        toSave.setGameName(gameDetails.getGameName());
        toSave.setDescription(gameDetails.getDescription());
        toSave.setCost(gameDetails.getCost());
        toSave.setViews(gameDetails.getViews());
        toSave.setYear(gameDetails.getYear());
        return gameDetailsRepository.save(toSave);
    }


   public GameDetails getByID(Integer id) {
        GameDetails details = gameDetailsRepository.getById(Long.valueOf(id));
        details.setViews(details.getViews()+1);
        gameDetailsRepository.save(details);
       return details;
   }

}
