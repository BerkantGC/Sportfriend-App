package com.GameSatis.backend.model;

import com.GameSatis.backend.dto.SellersDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileAndContentModel {

    private MultipartFile file;
    private SellersDto sellersDto;
}