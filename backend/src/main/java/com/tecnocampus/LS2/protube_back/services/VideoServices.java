package com.tecnocampus.LS2.protube_back.services;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoServices {

    public List<String> getVideos() {
        return List.of("video1", "video2", "video3");
    }

}
