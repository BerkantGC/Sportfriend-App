package com.GameSatis.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.GameSatis.backend.model.Games;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellersDto {
    private Long id;
    private String sellerName;

    private List<Games> games;

    private String imageUrl;
}
