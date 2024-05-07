package com.GameSatis.backend.service;

import com.GameSatis.backend.model.*;
import com.GameSatis.backend.dto.SellersDto;
import com.GameSatis.backend.repository.GameDetailsRepository;
import com.GameSatis.backend.repository.GamesRepository;
import com.GameSatis.backend.repository.ImageRepository;
import com.GameSatis.backend.repository.SellersRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class  SellersService {
    private final SellersRepository sellersRepository;
    private final GamesRepository gamesRepository;
    private final ImageRepository imageRepository;
    private final GameDetailsRepository gameDetailsRepository;

    public SellersService(SellersRepository sellersRepository, GamesRepository gamesRepository, ImageRepository imageRepository, GameDetailsRepository gameDetailsRepository) {
        this.sellersRepository = sellersRepository;
        this.gamesRepository = gamesRepository;
        this.imageRepository = imageRepository;
        this.gameDetailsRepository = gameDetailsRepository;
    }

    public SellersDto save(SellersDto sellersDto) throws IOException {

            Sellers sellers = new Sellers();
            sellers.setSellerName(sellersDto.getSellerName());

            final Sellers sellerDb = sellersRepository.save(sellers);
            List<Games> gamesList = new ArrayList<>();

            sellersDto.getGames().forEach(item->{
                Games games = new Games();

                GameDetails gameDetails = new GameDetails();

                games.setGameName(item.getGameName());
                games.setGameYear(item.getGameYear());
                games.setSeller_id(sellerDb.getId());
                games.setImageUrl(item.getImageUrl());

                gameDetails.setYear(item.getGameYear());
                gameDetails.setStock(item.getGameDetails().getStock());
                gameDetails.setViews(item.getGameDetails().getViews());
                gameDetails.setDescription(item.getGameDetails().getDescription());
                gameDetails.setGameName(item.getGameName());
                gameDetails.setCost(item.getGameDetails().getCost());
                gameDetails.setYoutubeTrailer(item.getGameDetails().getYoutubeTrailer());
                gameDetails.setImageUrl(item.getImageUrl());
                gameDetails.setId(item.getId());

                gameDetailsRepository.save(gameDetails);

                games.setGameDetails(gameDetails);
                gamesList.add(games);
            });
            gamesRepository.saveAll(gamesList);
            sellersDto.setId(sellerDb.getId());
            return sellersDto;
        }

        public Sellers update(Sellers sellers)
        {
            Sellers sellerToUpdate = sellersRepository.findBySellerName(sellers.getSellerName());

            List<Games> gamesList = new ArrayList<>();

            sellers.getGames().forEach(it-> {
                        Games games = new Games();
                        games.setGameName(it.getGameName());
                        games.setGameYear(it.getGameYear());
                        games.setFavoriteId(it.getFavoriteId());
                        games.setUserIds(it.getUserIds());
                        games.setSeller_id(sellerToUpdate.getId());
                        games.setImageUrl(it.getImageUrl());

                        GameDetails gameDetails = new GameDetails();
                        gameDetails.setGameName(it.getGameName());
                        gameDetails.setStock(it.getGameDetails().getStock());
                        gameDetails.setImageUrl(it.getImageUrl());
                        gameDetails.setYear(it.getGameYear());
                        gameDetails.setDescription(it.getGameDetails().getDescription());
                        gameDetails.setGameName(it.getGameName());
                        gameDetails.setCost(it.getGameDetails().getCost());
                        gameDetails.setViews(it.getGameDetails().getViews());
                        gameDetails.setYoutubeTrailer(it.getGameDetails().getYoutubeTrailer());

                        gameDetailsRepository.save(gameDetails);
                        games.setGameDetails(gameDetails);

                        gamesList.add(games);
            });
                    gamesRepository.saveAll(gamesList);

            return sellerToUpdate;
        }

        public List<SellersDto> getAll()
        {
            List<Sellers> sellersList = sellersRepository.findAll();
            List<SellersDto> sellersDtoList = new ArrayList<>();

            sellersList.forEach(item->{
                SellersDto sellersDto = new SellersDto();
                sellersDto.setSellerName(item.getSellerName());
                sellersDto.setId(item.getId());

                List<Games> gamesList = new ArrayList<>();
                item.getGames().forEach(it->{
                    Games tmpGames = new Games();
                    tmpGames.setSeller_id(it.getSeller_id());
                    tmpGames.setGameYear(it.getGameYear());
                    tmpGames.setGameName(it.getGameName());
                    tmpGames.setUserIds(it.getUserIds());
                    tmpGames.setImageUrl(it.getImageUrl());
                    tmpGames.setId(it.getId());
                    tmpGames.setGameDetails(it.getGameDetails());
                    tmpGames.setFavoriteId(it.getFavoriteId());
                    tmpGames.setImageUrl(it.getImageUrl());
                    gamesList.add(tmpGames);
                });
                sellersDto.setGames(gamesList);
                sellersDtoList.add(sellersDto);
            });
            return sellersDtoList;
        }

        public Page<Games> getAll(Pageable pageable) {
            return null;
        }

}
