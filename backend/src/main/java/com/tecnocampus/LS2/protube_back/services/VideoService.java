package com.tecnocampus.LS2.protube_back.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.dto.BasicVideoDTO;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.exceptions.UserNotFoundException;
import com.tecnocampus.LS2.protube_back.exceptions.VideoBadPostRequest;
import com.tecnocampus.LS2.protube_back.exceptions.VideoNotFoundException;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public VideoDTO createVideo(InputVideoRecord inputVideo) {
        User user = userRepository.findByUsername(inputVideo.username()).orElseThrow(() -> new VideoBadPostRequest(inputVideo.username()));
        Video video = new Video(inputVideo, user);
        user.addVideo(video);

        videoRepository.save(video);
        userRepository.save(user);
        return new VideoDTO(video);
    }

    public VideoDTO getVideo(String videoTile) {
        Video video = videoRepository.findByTitle(videoTile).orElseThrow(() -> new VideoNotFoundException(videoTile));
        return new VideoDTO(video);
    }

    public BasicVideoDTO getVideoById(Long videoId) {
        Video video = videoRepository.findById(videoId).orElseThrow(() -> new VideoNotFoundException(videoId));
        return new BasicVideoDTO(video);
    }

    public List<BasicVideoDTO> getVideoListByString(String input) {
        List<Video> videos = videoRepository.findByTitleContaining(input);

        return videos.stream()
                .map(BasicVideoDTO::new)
                .collect(Collectors.toList());
    }

    public List<BasicVideoDTO> getVideoByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        List<Video> videos = videoRepository.findByUser(user);

        return videos.stream()
                .map(BasicVideoDTO::new)
                .collect(Collectors.toList());
    }

    public List<BasicVideoDTO> getAllVideos() {
        List<Video> videos = videoRepository.findAll();

        return videos.stream()
                .map(BasicVideoDTO::new)
                .collect(Collectors.toList());
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