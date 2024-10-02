package com.tecnocampus.LS2.protube_back.controller;

import com.tecnocampus.LS2.protube_back.services.VideoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoServices videoServices;

    @GetMapping("/view")
    public ResponseEntity<String> getVideo() {
        return ResponseEntity.ok().body(videoServices.getVideos().toString());
    }









}
