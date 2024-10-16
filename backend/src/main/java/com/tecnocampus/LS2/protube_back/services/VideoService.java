package com.tecnocampus.LS2.protube_back.services;

import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public VideoDTO createVideo(InputVideoRecord inputVideo) {
        Video video = new Video(inputVideo);

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