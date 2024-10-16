package com.tecnocampus.LS2.protube_back.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UserRepository userRepository;

    public VideoDTO createVideo(InputVideoRecord inputVideo) {
        User user = userRepository.findByUsername(inputVideo.username()).orElseThrow(() -> new RuntimeException("User not found"));
        Video video = new Video(inputVideo, user);

        videoRepository.save(video);
        return new VideoDTO(video);
    }

    public VideoDTO getVideo(String videoTile) {
        Video video = videoRepository.findByTitle(videoTile).orElseThrow(() -> new RuntimeException("Video not found"));
        return new VideoDTO(video);
    }

    public void deleteVideo(Long videoId){
        videoRepository.deleteById(videoId);
    }


}



//@Autowired
////private Environment env;

//RECUPERAR LOS ARCHIVOS DE LOS VIDEOS
// public List<String> getVideos() {
//    String videoDirectory = env.getProperty("pro_tube.store.dir");

//  File directory = new File(videoDirectory);
//String[] files = directory.list((dir, name) -> name.endsWith(".mp4")); // Cambia la extensión si es necesario
// return files != null ? Arrays.asList(files) : List.of();
//}