package com.GameSatis.backend.controller;

import com.GameSatis.backend.model.Image;
import com.GameSatis.backend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.GameSatis.backend.util.ImageUtility;

import java.io.File;
import java.io.IOException;


@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FileUploadController {
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    @Autowired
    private ImageRepository imageRepository;

    @RequestMapping(value = "/upload")
    public ResponseEntity<?> UploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        Image imageToUpload = Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build();

        imageRepository.save(imageToUpload);

        String fileName = file.getOriginalFilename();
        try {
            file.transferTo(new File("C:\\Users\\Berkant\\Desktop\\Projects\\New "+"Gamesatis\\frontend\\src\\uploads\\" + fileName));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(imageToUpload);
    }

    @GetMapping(path = {"/images/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        Image dbImage = new Image();
        if(name!=null) {
            dbImage = imageRepository.findByName(name);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(dbImage.getType()))
                    .body(ImageUtility.decompressImage(dbImage.getImage()));
        }
        return (ResponseEntity<byte[]>) ResponseEntity.notFound();
    }

    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if(!directory.exists()){
            directory.mkdir();
        }
    }
}
