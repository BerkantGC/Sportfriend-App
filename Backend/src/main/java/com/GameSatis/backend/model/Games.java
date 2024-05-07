package com.GameSatis.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "games")
public class Games implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "game_year")
    private Integer gameYear;

    @Column(name = "seller_id")
    private Long seller_id;

    @Column(name = "image_name")
    private String imageUrl;

    @Column(name = "user_ids")
    private String userIds;

    @Column(name = "favorites_id")
    private Long favoriteId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private GameDetails gameDetails;
}
