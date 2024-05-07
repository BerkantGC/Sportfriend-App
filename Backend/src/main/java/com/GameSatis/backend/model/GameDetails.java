package com.GameSatis.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Proxy(lazy = false)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameDetails {
    @Id
    @SequenceGenerator(name = "game_details_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_details_sequence")
    private Long id;

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "year")
    private Integer year;

    @Column(name = "description", length = 2048)
    private String description;

    @Column(name = "stock")
    private Boolean stock;

    @Column(name = "views")
    private Integer views;

    @Column(name = "cost")
    private Integer cost;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "youtube_trailer")
    private String youtubeTrailer;
}
