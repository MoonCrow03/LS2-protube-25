package com.tecnocampus.LS2.protube_back.api;

import com.tecnocampus.LS2.protube_back.dto.UserDTO;
import com.tecnocampus.LS2.protube_back.dto.VideoDTO;
import com.tecnocampus.LS2.protube_back.dto.record.InputVideoRecord;
import com.tecnocampus.LS2.protube_back.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/videos")
public class VideoRestController {

    @Autowired
    private VideoService videoServices;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VideoDTO createVideo(@RequestBody InputVideoRecord video) {
        return videoServices.createVideo(video);
    }

    @GetMapping("/{videoTitle}")
    @ResponseStatus(HttpStatus.CREATED)
    public VideoDTO getVideo(@PathVariable String videoTitle) {
        return videoServices.getVideo(videoTitle);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoServices.deleteVideo(id);
    }

    @GetMapping("/list")
    public ResponseEntity<List<String>> getVideoList() {
        //List<String> videos = videoServices.getVideos();
        //return ResponseEntity.ok(videos);
        //falta implementar
        return ResponseEntity.ok(new ArrayList<>());
    }
}
