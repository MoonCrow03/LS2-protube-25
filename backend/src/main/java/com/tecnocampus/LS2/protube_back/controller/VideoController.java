package com.tecnocampus.LS2.protube_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @GetMapping("/view")
    public ResponseEntity<String> getVideo() {
        return ResponseEntity.ok().body("Hello World");
    }

    







}
